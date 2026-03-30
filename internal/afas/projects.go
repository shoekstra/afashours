package afas

import (
	"context"
	"encoding/json"
	"fmt"
)

// Project is an AFAS project as returned by the _Hours_Projects get connector.
type Project struct {
	ID        string `json:"project_id"`
	Name      string `json:"project"`
	Group     string `json:"project_group"`
	StartDate string `json:"start_date"`
	EndDate   string `json:"end_date"`
}

// ProjectType is an AFAS project type as returned by the _Hours_Types get connector.
type ProjectType struct {
	Description      string `json:"description"`
	IntegrationGroup string `json:"integration_group"`
	ItemCode         string `json:"item_code"`
}

// ListProjects returns all projects from the _Hours_Projects connector.
//
// Note: the underlying library does not support context cancellation; ctx is
// accepted for API consistency but is not threaded through to the HTTP call.
func (c *Client) ListProjects(_ context.Context) ([]Project, error) {
	req := c.api.Connector.NewListRequest()
	req.URLParams().ConnectorID = "_Hours_Projects"
	req.QueryParams().Take = 9999

	if _, err := req.Do(); err != nil {
		return nil, fmt.Errorf("listing projects: %w", err)
	}

	rows, ok := req.ResponseBody().Rows.([]interface{})
	if !ok || len(rows) == 0 {
		return nil, nil
	}

	projects := make([]Project, 0, len(rows))
	for _, v := range rows {
		b, err := json.Marshal(v)
		if err != nil {
			return nil, fmt.Errorf("marshalling project row: %w", err)
		}
		var p Project
		if err := json.Unmarshal(b, &p); err != nil {
			return nil, fmt.Errorf("decoding project: %w", err)
		}
		projects = append(projects, p)
	}
	return projects, nil
}

// ListProjectTypes returns all project types from the _Hours_Types connector.
//
// Note: the underlying library does not support context cancellation; ctx is
// accepted for API consistency but is not threaded through to the HTTP call.
func (c *Client) ListProjectTypes(_ context.Context) ([]ProjectType, error) {
	req := c.api.Connector.NewListRequest()
	req.URLParams().ConnectorID = "_Hours_Types"
	req.QueryParams().Take = 9999

	if _, err := req.Do(); err != nil {
		return nil, fmt.Errorf("listing project types: %w", err)
	}

	rows, ok := req.ResponseBody().Rows.([]interface{})
	if !ok || len(rows) == 0 {
		return nil, nil
	}

	types := make([]ProjectType, 0, len(rows))
	for _, v := range rows {
		b, err := json.Marshal(v)
		if err != nil {
			return nil, fmt.Errorf("marshalling project type row: %w", err)
		}
		var pt ProjectType
		if err := json.Unmarshal(b, &pt); err != nil {
			return nil, fmt.Errorf("decoding project type: %w", err)
		}
		types = append(types, pt)
	}
	return types, nil
}
