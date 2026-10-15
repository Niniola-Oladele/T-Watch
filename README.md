# T-Watch (Security Log Analyzer)

T-Watch is a browser-based security log analyzer built to help identify suspicious login activity from uploaded CSV files.

Developed as a defensive security portfolio project, ThreatWatch combines web development with basic security log analysis, input validation, and suspicious activity detection.

## Features

- **Flexible CSV Import:** Upload security logs with different column names.
- **Automatic Column Suggestions:** Recognize common column names and suggest appropriate matches.
- **Manual Column Mapping:** Choose which CSV columns represent timestamps, usernames, IP addresses, events, and login statuses.
- **Dashboard Statistics:** View total events, successful logins, failed logins, and security alerts.
- **Suspicious Activity Detection:** Flag IP addresses with five or more failed login attempts in the uploaded dataset.
- **Search:** Search security logs by username or IP address.
- **Filtering:** Filter logs by successful or failed login status.
- **Input Validation:** Validate required fields and skip invalid rows.
- **Security Alerts:** Highlight possible brute-force activity for further investigation.
- **Clear Logs:** Remove the current logs and reset dashboard statistics.
- **Download Reports:** Generate a downloadable text report of the analyzed logs.
- **Responsive Design:** Access the dashboard on desktop and mobile screens.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- [Papa Parse](https://www.papaparse.com/) — CSV parsing library

## Getting Started

### Use the Live Demo

Once deployed, you can access ThreatWatch through the live demo link:

**Live Demo:** [https://t-watch.netlify.app/]

Open the link in your browser, upload a CSV file containing security logs, review the suggested column mappings, and click **Analyze CSV** to begin.

### Run Locally

To run T-Watch on your computer:

1. Clone or download this repository.
2. Open the project folder in Visual Studio Code.
3. Open `index.html` in your browser or use a local development server.
4. Upload a CSV file and analyze your security logs.

An internet connection is required to load Papa Parse from its CDN.

## Preparing Your CSV File

ThreatWatch expects five types of information:

| Field | Description | Example |
|---|---|---|
| Timestamp | When the event occurred | `2026-10-15 09:00:00` |
| Username | Account associated with the event | `niniola` |
| IP address | IP address associated with the event | `192.168.1.10` |
| Event | Activity recorded in the log | `Login` |
| Status | Outcome of the login attempt | `Success` |

Your CSV file should contain a header row and data rows, for example:

```csv
timestamp,username,ip,event,status
2026-10-15 09:00:00,niniola,192.168.1.10,Login,Success
2026-10-15 09:05:00,admin,203.0.113.25,Login,Failed
```

### Using Different Column Names

Your CSV does not have to use the exact header names shown in the example.

ThreatWatch suggests matches for common alternatives, including:

- Timestamp: `time`, `date`, `datetime`
- Username: `user`, `account`, `login_user`
- IP address: `ip_address`, `source_ip`, `client_ip`
- Event: `activity`, `action`, `event_type`
- Status: `result`, `outcome`, `login_status`

After uploading a file, review the suggested mappings in the **Match Your CSV Columns** section. You can select different columns manually.

Each required field must be mapped to a different CSV column.

### Supported Login Statuses

ThreatWatch recognizes these status values:

- Successful login: `Success`, `Successful`, `Succeeded`
- Failed login: `Failed`, `Failure`, `Denied`

Rows with missing required values or unsupported statuses are skipped. If no valid rows remain, the file cannot be analyzed.

## How Security Detection Works

ThreatWatch counts failed login attempts for each IP address in the uploaded dataset.

When an IP address has five or more failed login attempts, ThreatWatch generates an alert for **possible brute-force activity**.

A brute-force attack involves repeated attempts to guess credentials. However, repeated failed logins do not automatically confirm malicious activity. The alert indicates that further investigation may be appropriate.

## Reports

After analyzing a CSV file, users can select **Download Report** to generate a text report containing the analyzed statistics, suspicious activity findings, and security log entries.

The report is downloaded as `ThreatWatch-Security-Report.txt`.

## Limitations

- ThreatWatch analyzes uploaded CSV files; it does not monitor systems or network traffic in real time.
- Detection is based on a simple threshold of five failed login attempts per IP address.
- Analysis depends on the quality and accuracy of the uploaded data.
- Column suggestions recognize a predefined set of common names; unfamiliar column names may need to be mapped manually.
- ThreatWatch is an educational portfolio project, not a replacement for a production security monitoring or incident response system.

## Project Purpose

This project was created to practise web development while exploring defensive security, log analysis, data validation, and basic threat detection.

## Author

**Niniola Deborah Oladele**

Computer Science graduate exploring web development and defensive security.
