package afas

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"

	afaslib "github.com/tim-online/go-afas-profit-rest"
)

// Client is an AFAS REST API client scoped to the Hours connectors.
type Client struct {
	api *afaslib.API
}

// NewClient creates a Client for the given AFAS account using the production
// REST endpoint. token is the raw AFAS API token.
func NewClient(account, token string) *Client {
	return newClient(
		nil,
		fmt.Sprintf("%s.rest.afas.online", account),
		token,
	)
}

// newClient creates a Client with an optional custom http.Client and host.
// Used by NewClient (production) and tests.
func newClient(hc *http.Client, host, token string) *Client {
	api := afaslib.NewAPI(hc, "", token)
	api.SetBaseURL(url.URL{
		Scheme: "https",
		Host:   host,
		Path:   "/ProfitRestServices/",
	})
	return &Client{api: api}
}

// GetDayEntries returns all hour entries for the given employee on the given
// date. date must be in YYYY-MM-DD format.
//
// Note: the underlying library does not support context cancellation; ctx is
// accepted for API consistency but is not threaded through to the HTTP call.
func (c *Client) GetDayEntries(_ context.Context, employeeID, date string) ([]WorkEntryResponse, error) {
	req := c.api.Connector.NewListRequest()
	req.URLParams().ConnectorID = "_Hours_Entries"
	req.QueryParams().FilterFieldIDs = "resource_id"
	req.QueryParams().FilterValues = employeeID
	req.QueryParams().OrderByFieldIDs = "period"
	req.QueryParams().Take = 9999

	if _, err := req.Do(); err != nil {
		return nil, err
	}

	rows, ok := req.ResponseBody().Rows.([]interface{})
	if !ok || len(rows) == 0 {
		return nil, nil
	}

	period := date + "T00:00:00Z"
	var entries []WorkEntryResponse
	for _, v := range rows {
		if v.(map[string]interface{})["period"] != period {
			continue
		}
		b, err := json.Marshal(v)
		if err != nil {
			return nil, fmt.Errorf("marshalling row: %w", err)
		}
		var entry WorkEntryResponse
		if err := json.Unmarshal(b, &entry); err != nil {
			return nil, fmt.Errorf("decoding entry: %w", err)
		}
		entries = append(entries, entry)
	}

	return entries, nil
}

// DeleteEntry deletes a single hour entry from AFAS.
//
// Note: the underlying library does not support context cancellation; ctx is
// accepted for API consistency but is not threaded through to the HTTP call.
func (c *Client) DeleteEntry(_ context.Context, entry WorkEntryResponse) error {
	req := c.api.Connector.NewDeleteRequest()
	req.SetMethod("POST")
	req.URLParams().ConnectorID = "PtRealization"

	body := &workEntryRequest{}
	body.PtRealization.Element.Fields = []*workEntryRequestField{
		{
			Action: "delete",
			WorkEntry: &WorkEntry{
				DateTime: entry.Period,
				ID:       entry.RecordNumber,
			},
		},
	}
	req.SetRequestBody(body)

	if _, err := req.Do(); err != nil {
		return err
	}

	return nil
}

// InsertEntry inserts a new hour entry into AFAS and returns the ID of the
// created record.
//
// Note: the underlying library does not support context cancellation; ctx is
// accepted for API consistency but is not threaded through to the HTTP call.
func (c *Client) InsertEntry(_ context.Context, entry *WorkEntry) (string, error) {
	body := &workEntryRequest{}
	body.PtRealization.Element.Fields = []*workEntryRequestField{
		{Action: "insert", WorkEntry: entry},
	}

	req := c.api.Connector.NewInsertRequest()
	req.URLParams().ConnectorID = "PtRealization"
	req.SetRequestBody(body)

	resp, err := req.Do()
	if err != nil {
		return "", err
	}

	var result WorkEntryResponse
	if err := json.Unmarshal(resp.Results, &result); err != nil {
		return "", fmt.Errorf("decoding insert response: %w", err)
	}

	return result.PtRealization.ID, nil
}
