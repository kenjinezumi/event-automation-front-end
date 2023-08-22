import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  TextareaAutosize,
  Checkbox
} from "@mui/material";
import { InputLabel } from "@mui/material";
import dayjs from "dayjs";
import { handleAddEvent } from "./apis/events";
import { sendApiAlgoCall } from "./apis/algo";


import {Event, EventFormProps, EventFormData, EventAlgoData} from "../entities/events"
import {fetchIndustries, fetchFunctions, fetchAccount, fetchSeniority, fetchCountry, fetchBdrs } from "./apis/fetch"



export default function EventForm({
  selectedDate,
  onDateChange,
  onSubmit,
}: EventFormProps) {

  
  interface FilteredContact {
    contact_id: string;
    account__account_id: string;
    name: string;
    seniority: string;
    job_function: string;
    email: string;
  }
  const [eventName, setEventName] = useState("");
  const [eventId, setEventId] = useState("");
  const [registrationPageUrl, setRegistrationPageUrl] = useState("");

  const [location, setLocation] = useState<string[]>([]);
  const [location_selected, setLocationSelected] = useState("");

  const [maxCapacity, setMaxCapacity] = useState(20);
  const [seniority_selected, setSenioritySelected] = useState<string[]>([]);
  const [seniority, setSeniority] = useState<string[]>([]);
  const [industries_selected, setIndustriesSelected] = useState<string[]>([]);
  const [industries, setIndustries] = useState<string[]>([]);

  const [functions, setFunctions] = useState<string[]>([]);
  const [functions_selected, setFunctionsSelected] = useState<string[]>([]);

  const [accounts, setAccounts] = useState<string[]>([]);
  const [accounts_selected, setAccountsSelected] = useState<string[]>([]);
  const [eventBdrSelected, setEventBdrSelected] = useState("");
  const [eventBdr, setEventBdr] = useState<string[]>([]);

  const [subjectLine, setSubjectLine] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [sendDatetime, setSendDatetime] = useState<dayjs.Dayjs | null>(null);
  const [eventDatetime, setEventDatetime] = useState<dayjs.Dayjs | null>(null);

  const [showEvents, setShowEvents] = useState(false);
  const [showTarget, setShowTarget] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showSales, setShowSales] = useState(false);

  const [filteredContacts, setFilteredContacts] = useState<FilteredContact[]>([]);
  const [selectedContactIds, setSelectedContactIds] = useState<string[]>([]); 
  const [showFilteredContacts, setShowFilteredContacts] = useState(false);
  const [recipients, setRecipients] = useState<string[]>([]); 

  const [exceededMaxCapacity, setExceededMaxCapacity] = useState(false);


  interface Contact {
    contact_id: string;
    name: string;
    account__account_id: string;
    seniority: string;
    job_function: string;
    email: string; 
  }



  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, contactId: string, email: string) => {
    const isChecked = event.target.checked;
  
    if (isChecked) {
      if (selectedContactIds.length < maxCapacity) {
        setSelectedContactIds((prevSelectedIds) => [...prevSelectedIds, contactId]);
        setRecipients((prevRecipients) => [...prevRecipients, email]);
        setExceededMaxCapacity(false); // Reset the exceeded capacity state
      } else {
        setExceededMaxCapacity(true); // Set exceeded capacity state to true
      }
    } else {
      setSelectedContactIds((prevSelectedIds) =>
        prevSelectedIds.filter((id) => id !== contactId)
      );
      setRecipients((prevRecipients) =>
        prevRecipients.filter((recipient) => recipient !== email)
      );
      setExceededMaxCapacity(false); // Reset the exceeded capacity state
    }
  };
  
  
 

  useEffect(() => {
    // Fetch industries when the component mounts
    
    async function fetchData(){
      const uniqueIndustries =  await fetchIndustries();
      const uniqueFunctions = await fetchFunctions(); 
      const uniqueSeniority = await fetchSeniority();
      const uniqueAccounts = await fetchAccount(); 
      const uniqueCountries = await fetchCountry();   
      const uniqueBdrs = await fetchBdrs();     
  
      setEventBdr(uniqueBdrs);
      setIndustries(uniqueIndustries);
      setFunctions(uniqueFunctions);
      setSeniority(uniqueSeniority);
      setAccounts(uniqueAccounts);
      setLocation(uniqueCountries);
    }
    fetchData();

  }, []);

  async function fetchSuggestions(algoEventData: any) {
    const results = await sendApiAlgoCall(algoEventData);
    return results;
  }


  useEffect(() => {

   
    // Define an async function within useEffect
    async function fetchData() {
      if (location_selected && maxCapacity && industries_selected.length > 0 && functions_selected.length > 0) {
        const algoData: EventAlgoData = {
          event_location: location_selected,
          maximum_capacity: maxCapacity,
          target_audience: {
            seniority: seniority_selected,
            industries: industries_selected,
            functions: functions_selected,
          },
        };
  
        const response = await fetchSuggestions(algoData);
        setFilteredContacts(JSON.parse(response['filtered_contacts'])); 
        setShowFilteredContacts(true);

      }
    }
  
    // Call the async function
    fetchData();
  
  }, [location_selected, maxCapacity, seniority_selected, industries_selected, functions_selected]);
  

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      eventName &&
      registrationPageUrl &&
      location &&
      seniority &&
      industries.length > 0 &&
      functions.length > 0 &&
      subjectLine &&
      bodyText
    ) {
      const eventData: EventFormData = {
        accounts: accounts_selected,
        event_id: eventId,
        event_name: eventName,
        registration_page_url: registrationPageUrl,
        event_date: selectedDate,
        event_location: location_selected,
        maximum_capacity: maxCapacity,
        contact: eventBdrSelected,
        target_audience: {
          seniority: seniority_selected,
          industries: industries_selected,
          functions: functions_selected,
        },
        event_copy: {
          send_time: sendDatetime,
          subjectLine: subjectLine,
          bodyText: bodyText,
        },
        contact_lists: selectedContactIds
      };

      // Call onSubmit to handle form data
      onSubmit(eventData);

      // Call handleAddEvent to send data to API
      const eventAdded = await handleAddEvent(eventData);

      if (eventAdded) {
        // Reset form fields
        setEventName("");
        setEventId("");
        setRegistrationPageUrl("");
        setLocation([]);
        setMaxCapacity(20);
        setSeniority([]);
        setIndustries([]);
        setFunctions([]);
        setSubjectLine("");
        setBodyText("");
        setSendDatetime(null);
        setFilteredContacts([]);
      } else {
        // Handle error case
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleFormSubmit}>
        <div>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setShowEvents(!showEvents)}
            style={{ marginBottom: "8px", marginTop: "8px" }}
          >
            Events
          </Button>
        </div>
        {showEvents && (
          <div>
            <TextField
              label="Event Name"
              fullWidth
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Event ID"
              fullWidth
              value={eventId}
              onChange={(e) => setEventId(e.target.value)}
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Event date"
              type="datetime-local"
              value={
                eventDatetime ? eventDatetime.format("YYYY-MM-DDTHH:mm") : ""
              }
              onChange={(e) => setEventDatetime(dayjs(e.target.value))}
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Registration Page URL"
              fullWidth
              value={registrationPageUrl}
              onChange={(e) => setRegistrationPageUrl(e.target.value)}
              margin="normal"
              variant="outlined"
            />
  
            <InputLabel>Event location</InputLabel>
            <Select
              fullWidth
              displayEmpty
              renderValue={(selected) =>
                selected.length === 0 ? "Select location" : selected
              }
              value={location_selected}
              onChange={(e) => setLocationSelected(e.target.value)}
              variant="outlined"
            >
              {location.map((sloc) => (
                <MenuItem key={sloc} value={sloc}>
                  {sloc}
                </MenuItem>
              ))}
            </Select>
            <TextField
              label="Maximum Capacity"
              fullWidth
              type="number"
              value={maxCapacity}
              onChange={(e) => setMaxCapacity(parseInt(e.target.value))}
              margin="normal"
              variant="outlined"
            />
          </div>
        )}

        <div>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setShowTarget(!showTarget)}
            style={{ marginBottom: "8px", marginTop: "8px" }}
          >
            Target Audience
          </Button>
        </div>
        {showTarget && (
          <div>
            <InputLabel>Seniority</InputLabel>
            <Select
              fullWidth
              multiple
              displayEmpty
              renderValue={(selected) =>
                selected.length === 0 ? "Select seniority" : selected.join(", ")
              }
              value={seniority_selected}
              onChange={(e) => setSenioritySelected(e.target.value as string[])}
              variant="outlined"
            >
              {seniority.map((seniority_it) => (
                <MenuItem key={seniority_it} value={seniority_it}>
                  {seniority_it}
                </MenuItem>
              ))}
            </Select>

            <InputLabel>Industry</InputLabel>
            <Select
              fullWidth
              multiple
              displayEmpty
              renderValue={(selected) =>
                selected.length === 0 ? "Select seniority" : selected.join(", ")
              }
              value={industries_selected}
              onChange={(e) => setIndustriesSelected(e.target.value as string[])}
              variant="outlined"
            >
              {industries.map((industry) => (
                <MenuItem key={industry} value={industry}>
                  {industry}
                </MenuItem>
              ))}
            </Select>


            <InputLabel>Functions</InputLabel>
            <Select
              fullWidth
              multiple
              displayEmpty
              renderValue={(selected) =>
                selected.length === 0 ? "Select functions" : selected.join(", ")
              }
              value={functions_selected}
              onChange={(e) => setFunctionsSelected(e.target.value as string[])}
              variant="outlined"
            >
              {functions.map((jobs) => (
                <MenuItem key={jobs} value={jobs}>
                  {jobs}
                </MenuItem>
              ))}
            </Select>
          </div>
        )}

        <div>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setShowSales(!showSales)}
            style={{ marginBottom: "8px", marginTop: "8px" }}
          >
            Target Accounts
          </Button>
        </div>
        {showSales && (
          <div>
          {showFilteredContacts && (
            <div>
              <div style={{ overflowY: 'auto', maxHeight: '400px' }}> 
              {exceededMaxCapacity && (
  <p>You've exceeded the limit of {maxCapacity} recipients.</p>
)}
                <table>
                  <thead>
                    <tr>
                      <th>Select</th>
                      <th>Name</th>
                      <th>Account ID</th>
                      <th>Seniority</th>
                      <th>Job Function</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContacts.map((contact: any) => (
                      <tr key={contact.contact_id}>
                        <td>
                         <input
                      type="checkbox"
                      checked={selectedContactIds.includes(contact.contact_id)}
                      onChange={(event) =>
                        handleCheckboxChange(event, contact.contact_id, contact.email)
                      }
                    />
                        </td>
                        <td>{contact.name}</td>
                        <td>{contact.account__account_id}</td>
                        <td>{contact.seniority}</td>
                        <td>{contact.job_function}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
        
          
      )}

        <div>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setShowEmail(!showEmail)}
            style={{ marginBottom: "8px", marginTop: "8px" }}
          >
            Email
          </Button>
        </div>

        {showEmail && (
          <div>
            <label>Sender:</label>
           
            <Select
              fullWidth
              displayEmpty
              renderValue={(selected) =>
                selected.length === 0 ? "Select BDR" : selected
              }
              value={eventBdrSelected}
              onChange={(e) => setEventBdrSelected(e.target.value)}
              variant="outlined"
            >
              {eventBdr.map((bdr) => (
                <MenuItem key={bdr} value={bdr}>
                  {bdr}
                </MenuItem>
              ))}
            </Select>
           <label>Recipients:</label>
            <input
              type="text"
              value={recipients.join(', ')} // Display recipients as comma-separated list
              readOnly
              style={{ width: '100%' }}
            />
            {selectedContactIds.length > maxCapacity && (
              <p>You're over the limit of {maxCapacity} recipients.</p>
            )}
            <TextField
              label="Email Subject Line"
              fullWidth
              value={subjectLine}
              onChange={(e) => setSubjectLine(e.target.value)}
              margin="normal"
              variant="outlined"
            />
            <TextareaAutosize
              placeholder="Email body"
              value={bodyText}
              onChange={(e) => setBodyText(e.target.value)}
              minRows={4}
              style={{ marginBottom: "16px" }}
            />
            <TextField
              label="Send Date and Time"
              type="datetime-local"
              value={
                sendDatetime ? sendDatetime.format("YYYY-MM-DDTHH:mm") : ""
              }
              onChange={(e) => setSendDatetime(dayjs(e.target.value))}
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        )}

        <div style={{ marginTop: "16px" }}>
          <Button variant="contained" color="primary" type="submit">
            Add Event
          </Button>
        </div>
      </form>
      <style jsx>{`
        /* ... (existing styles) */
        .MuiFormControl-root {
          margin-top: 8px;
        }
      `}</style>
    </Container>
  );
}
