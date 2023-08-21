import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  TextareaAutosize,
} from "@mui/material";
import { InputLabel } from "@mui/material";
import dayjs from "dayjs";
import { handleAddEvent } from "./apis/events";

interface EventFormProps {
  selectedDate: dayjs.Dayjs;
  onDateChange: (date: dayjs.Dayjs | null) => void;
  onSubmit: (eventData: EventFormData) => void;
}

interface EventFormData {
  accounts: string[],
  event_id: number;
  event_name: string;
  registration_page_url: string;
  event_date: dayjs.Dayjs;
  event_location: string;
  maximum_capacity: number;
  contact: string;
  target_audience: {
    seniority: string[];
    industries: string[];
    functions: string[];
  };
  event_copy: {
    subjectLine: string;
    bodyText: string;
  };
}

export default function EventForm({
  selectedDate,
  onDateChange,
  onSubmit,
}: EventFormProps) {
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
  const [eventBdr, setEventBdr] = useState("");

  const [subjectLine, setSubjectLine] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [sendDatetime, setSendDatetime] = useState<dayjs.Dayjs | null>(null);

  const [showEvents, setShowEvents] = useState(false);
  const [showTarget, setShowTarget] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showSales, setShowSales] = useState(false);

  useEffect(() => {
    // Fetch industries when the component mounts
    async function fetchIndustries() {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/industries/");
        const jsonData = await response.json();
        const uniqueIndustries = jsonData.industries;

        setIndustries(uniqueIndustries);
      } catch (error) {
        console.error("Error fetching industries:", error);
      }
    }

    async function fetchFunctions() {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/functions/");
        const jsonData = await response.json();
        const uniqueFunctions = jsonData.job_function;

        setFunctions(uniqueFunctions);
      } catch (error) {
        console.error("Error fetching functions:", error);
      }
    }

    async function fetchAccount() {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/accounts/");
        const jsonData = await response.json();
        const uniqueAccounts = jsonData.account_id;

        setAccounts(uniqueAccounts);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    }

    async function fetchSeniority() {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/seniority/");
        const jsonData = await response.json();
        const uniqueSeniority = jsonData.seniority;

        setSeniority(uniqueSeniority);
      } catch (error) {
        console.error("Error fetching seniority", error);
      }
    }

    async function fetchCountry() {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/countries/");
        const jsonData = await response.json();
        const uniqueCountries = jsonData.country;

        setLocation(uniqueCountries);
      } catch (error) {
        console.error("Error fetching countries", error);
      }
    }

    fetchIndustries();
    fetchFunctions();
    fetchSeniority();
    fetchAccount();
    fetchCountry();
  }, []);

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
        event_id: 0,
        event_name: eventName,
        registration_page_url: registrationPageUrl,
        event_date: selectedDate,
        event_location: location_selected,
        maximum_capacity: maxCapacity,
        contact: eventBdr,
        target_audience: {
          seniority: seniority_selected,
          industries: industries_selected,
          functions: functions_selected,
        },
        event_copy: {
          subjectLine: subjectLine,
          bodyText: bodyText,
        },
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
        setLocation("");
        setMaxCapacity(20);
        setSeniority([]);
        setIndustries([]);
        setFunctions([]);
        setSubjectLine("");
        setBodyText("");
        setSendDatetime(null);
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
            Business Development Representative
          </Button>
        </div>
        {showSales && (
          <div>
            <TextField
              label="Business Development representative"
              fullWidth
              value={eventBdr}
              onChange={(e) => setEventBdr(e.target.value)}
              margin="normal"
              variant="outlined"
            />
          <InputLabel>Accounts</InputLabel>
          <Select
            fullWidth
            multiple
            displayEmpty
            renderValue={(selected) =>
              selected.length === 0 ? "Select accounts" : selected.join(", ")
            }
            value={accounts_selected}
            onChange={(e) => setAccountsSelected(e.target.value as string[])}
            variant="outlined"
          >
            {accounts.map((account) => (
              <MenuItem key={account} value={account}>
                {account}
              </MenuItem>
            ))}
          </Select>
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
