package afas

// WorkEntry is an AFAS hour entry used for insert and delete operations via
// the PtRealization update connector.
type WorkEntry struct {
	DateTime         string `json:"DaTi,omitempty"`
	Description      string `json:"Ds,omitempty"`
	EmployeeNumber   string `json:"EmId,omitempty"`
	ExAp             bool   `json:"ExAp,omitempty"`
	ID               int    `json:"Id,omitempty"`
	InPu             bool   `json:"InPu,omitempty"`
	ItemCode         string `json:"ItCd,omitempty"`
	ProjectID        string `json:"PrId,omitempty"`
	StID             string `json:"StId,omitempty"`
	StartTime        string `json:"StTi,omitempty"`
	EndTime          string `json:"EnTi,omitempty"`
	UnknownCandidate bool   `json:"UnknownCandidate,omitempty"`
	VaIt             string `json:"VaIt,omitempty"`
}

// WorkEntryResponse is an AFAS hour entry as returned by the _Hours_Entries
// get connector.
type WorkEntryResponse struct {
	Activity     string  `json:"activity"`
	EndTime      string  `json:"end_time"`
	HoursType    string  `json:"hours_type"`
	Name         string  `json:"name"`
	Period       string  `json:"period"`
	Project      string  `json:"project"`
	ProjectCode  string  `json:"project_code"`
	RecordNumber int     `json:"record_number"`
	ResourceID   string  `json:"resource_id"`
	StartTime    string  `json:"start_time"`
	UsedHrs      float64 `json:"used_hrs"`

	PtRealization struct {
		ID         string `json:"Id"`
		XpRe       string `json:"XpRe"`
		Sessieguid string `json:"Sessieguid"`
	} `json:"PtRealization"`
}

// workEntryRequest is the request body for PtRealization connector operations.
type workEntryRequest struct {
	PtRealization struct {
		Element struct {
			Fields []*workEntryRequestField `json:"Fields"`
		} `json:"Element"`
	} `json:"PtRealization"`
}

// workEntryRequestField is a single action within a workEntryRequest.
type workEntryRequestField struct {
	Action string `json:"@Action"`
	*WorkEntry
}
