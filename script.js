// =========================
// SAMPLE SECURITY LOGS
// =========================

const sampleSecurityLogs = [
    {
        timestamp: "2026-10-13 09:00:12",
        username: "admin",
        ip: "192.168.1.10",
        event: "Login",
        status: "Success"
    },
    {
        timestamp: "2026-10-13 09:02:34",
        username: "james",
        ip: "192.168.1.15",
        event: "Login",
        status: "Success"
    },
    {
        timestamp: "2026-10-13 09:05:10",
        username: "admin",
        ip: "203.0.113.25",
        event: "Login",
        status: "Failed"
    },
    {
        timestamp: "2026-10-13 09:05:45",
        username: "admin",
        ip: "203.0.113.25",
        event: "Login",
        status: "Failed"
    },
    {
        timestamp: "2026-10-13 09:06:02",
        username: "admin",
        ip: "203.0.113.25",
        event: "Login",
        status: "Failed"
    },
    {
        timestamp: "2026-10-13 09:06:30",
        username: "admin",
        ip: "203.0.113.25",
        event: "Login",
        status: "Failed"
    },
    {
        timestamp: "2026-10-13 09:07:01",
        username: "admin",
        ip: "203.0.113.25",
        event: "Login",
        status: "Failed"
    },
    {
        timestamp: "2026-10-13 09:10:15",
        username: "sarah",
        ip: "192.168.1.20",
        event: "Login",
        status: "Success"
    },
    {
        timestamp: "2026-10-13 09:12:40",
        username: "michael",
        ip: "192.168.1.22",
        event: "Login",
        status: "Failed"
    }
];

const securityLogs = [];

// =========================
// CALCULATE STATISTICS
// =========================

const totalEvents = securityLogs.length;

const successfulLogins = securityLogs.filter(log =>
    log.status === "Success"
).length;

const failedLogins = securityLogs.filter(log =>
    log.status === "Failed"
).length;


// =========================
// DISPLAY STATISTICS
// =========================

document.getElementById("total-events").textContent =
    totalEvents;

document.getElementById("successful-logins").textContent =
    successfulLogins;

document.getElementById("failed-logins").textContent =
    failedLogins;

    // =========================
// DETECT SUSPICIOUS ACTIVITY
// =========================

const failedAttempts = {};

securityLogs.forEach(log => {

    if (log.status === "Failed") {

        if (!failedAttempts[log.ip]) {
            failedAttempts[log.ip] = 0;
        }

        failedAttempts[log.ip]++;

    }

});


// =========================
// GENERATE SECURITY ALERTS
// =========================

const alerts = [];

for (const ip in failedAttempts) {

    if (failedAttempts[ip] >= 5) {

        alerts.push({
            ip: ip,
            attempts: failedAttempts[ip],
            message: "Possible brute-force activity detected"
        });

    }

}

// =========================
// UPDATE ALERT STATISTIC
// =========================

document.getElementById("security-alerts").textContent =
alerts.length;

// =========================
// DISPLAY SECURITY ALERTS
// =========================

const alertsContainer =
    document.getElementById("alerts-container");

if (securityLogs.length === 0) {

    alertsContainer.innerHTML = `
        <p class="empty-message">
            Upload a CSV file to analyze security activity.
        </p>
    `;

} else if (alerts.length === 0) {

    alertsContainer.innerHTML = `
        <p class="empty-message">
            No suspicious activity detected in the uploaded logs.
        </p>
    `;

} else {

    alertsContainer.innerHTML = "";

    alerts.forEach(alert => {

        const alertCard = document.createElement("div");

        alertCard.className = "alert-card";

        alertCard.innerHTML = `
            <div>
                <h3>Suspicious Login Activity</h3>
                <p>${alert.message}</p>
                <p>IP Address: ${alert.ip}</p>
                <p>Failed Attempts: ${alert.attempts}</p>
            </div>

            <span class="alert-severity">HIGH</span>
        `;

        alertsContainer.appendChild(alertCard);

    });

}

// =========================
// DISPLAY SECURITY LOGS
// =========================

const logsTable = document.getElementById("logs-table");

logsTable.innerHTML = "";

if (securityLogs.length === 0) {
    logsTable.innerHTML = `
        <tr>
            <td colspan="5" class="empty-message">
                Upload a CSV file to view security logs.
            </td>
        </tr>
    `;
}

securityLogs.forEach(log => {

    const row = document.createElement("tr");

    const statusClass =
        log.status === "Success" ? "success" : "failed";

    row.innerHTML = `
        <td>${log.timestamp}</td>
        <td>${log.username}</td>
        <td>${log.ip}</td>
        <td>${log.event}</td>
        <td>
            <span class="log-status ${statusClass}">
                ${log.status}
            </span>
        </td>
    `;

    logsTable.appendChild(row);

});

// =========================
// SEARCH AND FILTER LOGS
// =========================

const searchInput = document.getElementById("search-input");
const statusFilter = document.getElementById("status-filter");


function displayFilteredLogs() {

    const searchTerm = searchInput.value.toLowerCase();
    const selectedStatus = statusFilter.value;

    const filteredLogs = securityLogs.filter(log => {

        const matchesSearch =
            log.username.toLowerCase().includes(searchTerm) ||
            log.ip.toLowerCase().includes(searchTerm);

        const matchesStatus =
            selectedStatus === "All" ||
            log.status === selectedStatus;

        return matchesSearch && matchesStatus;
    });

    logsTable.innerHTML = "";

    if (filteredLogs.length === 0) {

        const row = document.createElement("tr");
        const cell = document.createElement("td");

        cell.colSpan = 5;
        cell.className = "empty-message";
        cell.textContent = securityLogs.length === 0
            ? "Upload a CSV file to view security logs."
            : "No matching security logs found.";

        row.appendChild(cell);
        logsTable.appendChild(row);

        return;
    }

    filteredLogs.forEach(log => {

        const row = document.createElement("tr");

        const values = [
            log.timestamp,
            log.username,
            log.ip,
            log.event
        ];

        values.forEach(value => {

            const cell = document.createElement("td");

            // Display CSV values as text, not HTML
            cell.textContent = value;

            row.appendChild(cell);
        });

        const statusCell = document.createElement("td");
        const statusLabel = document.createElement("span");

        statusLabel.className =
            log.status === "Success"
                ? "log-status success"
                : "log-status failed";

        statusLabel.textContent = log.status;

        statusCell.appendChild(statusLabel);
        row.appendChild(statusCell);

        logsTable.appendChild(row);
    });
}

searchInput.addEventListener("input", displayFilteredLogs);
statusFilter.addEventListener("change", displayFilteredLogs);



// =========================
// UPLOAD AND READ CSV FILE
// =========================

const csvUpload = document.getElementById("csv-upload");

const columnMapping = document.getElementById("column-mapping");

const mappingSelects = {
    timestamp: document.getElementById("map-timestamp"),
    username: document.getElementById("map-username"),
    ip: document.getElementById("map-ip"),
    event: document.getElementById("map-event"),
    status: document.getElementById("map-status")
};

const analyzeCsvButton = document.getElementById("analyze-csv");


analyzeCsvButton.addEventListener("click", function () {
    const selectedColumns = {};

    Object.entries(mappingSelects).forEach(([field, select]) => {
        selectedColumns[field] = select.value;
    });

    // Make sure every required field uses a different CSV column.
    const selectedValues = Object.values(selectedColumns);

    if (new Set(selectedValues).size !== selectedValues.length) {
        alert("Please select a different CSV column for each field.");
        return;
    }

    const uploadedLogs = [];
    let skippedRows = 0;

    pendingCsvData.forEach(row => {
        const timestamp = String(row[selectedColumns.timestamp] ?? "").trim();
        const username = String(row[selectedColumns.username] ?? "").trim();
        const ip = String(row[selectedColumns.ip] ?? "").trim();
        const event = String(row[selectedColumns.event] ?? "").trim();
        const rawStatus = String(row[selectedColumns.status] ?? "").trim().toLowerCase();

        let status;

        if (["success", "successful", "succeeded"].includes(rawStatus)) {
            status = "Success";
        } else if (["failed", "failure", "denied"].includes(rawStatus)) {
            status = "Failed";
        }

        if (!timestamp || !username || !ip || !event || !status) {
            skippedRows++;
            return;
        }

        uploadedLogs.push({
            timestamp,
            username,
            ip,
            event,
            status
        });
    });

    if (uploadedLogs.length === 0) {
        alert("No valid security logs found. Check your column selections and login statuses.");
        return;
    }

    // Replace the current logs with the newly analyzed logs.
    securityLogs.splice(0, securityLogs.length, ...uploadedLogs);

    // Update dashboard statistics.
    document.getElementById("total-events").textContent = securityLogs.length;

    document.getElementById("successful-logins").textContent =
        securityLogs.filter(log => log.status === "Success").length;

    document.getElementById("failed-logins").textContent =
        securityLogs.filter(log => log.status === "Failed").length;

    // Detect possible brute-force activity.
    const attemptsByIP = {};

    securityLogs.forEach(log => {
        if (log.status === "Failed") {
            attemptsByIP[log.ip] = (attemptsByIP[log.ip] || 0) + 1;
        }
    });

    const uploadedAlerts = Object.entries(attemptsByIP)
        .filter(([ip, attempts]) => attempts >= 5)
        .map(([ip, attempts]) => ({
            ip,
            attempts,
            message: "Possible brute-force activity detected"
        }));

    // Display security alerts.
    alertsContainer.innerHTML = "";

    if (uploadedAlerts.length === 0) {
        const message = document.createElement("p");
        message.className = "empty-message";
        message.textContent = "No suspicious activity detected in the uploaded logs.";
        alertsContainer.appendChild(message);
    } else {
        uploadedAlerts.forEach(alert => {
            const card = document.createElement("div");
            card.className = "alert-card";

            const content = document.createElement("div");
            const heading = document.createElement("h3");
            heading.textContent = "Possible Brute-Force Attempt";

            const description = document.createElement("p");
            description.textContent = alert.message;

            const ipAddress = document.createElement("p");
            ipAddress.textContent = `IP Address: ${alert.ip}`;

            const attempts = document.createElement("p");
            attempts.textContent = `Failed Attempts: ${alert.attempts}`;

            const severity = document.createElement("span");
            severity.className = "alert-severity";
            severity.textContent = "HIGH";

            content.appendChild(heading);
            content.appendChild(description);
            content.appendChild(ipAddress);
            content.appendChild(attempts);

            card.appendChild(content);
            card.appendChild(severity);
            alertsContainer.appendChild(card);
        });
    }

    document.getElementById("security-alerts").textContent = uploadedAlerts.length;

    // Refresh the logs table and reset the search controls.
    searchInput.value = "";
    statusFilter.value = "All";
    displayFilteredLogs();

    columnMapping.hidden = true;

    if (skippedRows > 0) {
        alert(
            `Analysis complete.\n\n${uploadedLogs.length} valid rows analyzed.\n${skippedRows} invalid rows skipped.`
        );
    } else {
        alert("Security logs analyzed successfully!");
    }
});


let pendingCsvData = [];

csvUpload.addEventListener("change", function () {

    const file = csvUpload.files[0];

    if (!file) return;

    if (typeof Papa === "undefined") {
        alert("The CSV parser could not load. Check your internet connection and refresh the page.");
        csvUpload.value = "";
        return;
    }

    Papa.parse(file, {
        header: true,
        skipEmptyLines: "greedy",
        transformHeader: header => header.trim().toLowerCase(),

        complete: function (results) {

            const headers = results.meta.fields || [];

            if (results.errors.length > 0) {
                alert("The CSV file could not be parsed correctly. Please check the file and try again.");
                csvUpload.value = "";
                return;
            }

            if (headers.length === 0) {
                alert("The CSV file has no column headers.");
                csvUpload.value = "";
                return;
            }

            // Keep the uploaded CSV data until the user maps the columns.
            pendingCsvData = results.data;

            // Recognize common column names and suggest a matching field.
            const aliases = {
                timestamp: ["timestamp", "time", "date", "datetime", "date_time"],
                username: ["username", "user", "account", "login_user"],
                ip: ["ip", "ip_address", "source_ip", "client_ip"],
                event: ["event", "activity", "action", "event_type"],
                status: ["status", "result", "outcome", "login_status"]
            };

            // Populate each dropdown with the CSV's column names.
            Object.entries(mappingSelects).forEach(([field, select]) => {
                select.innerHTML = "";

                headers.forEach(header => {
                    const option = document.createElement("option");
                    option.value = header;
                    option.textContent = header;
                    select.appendChild(option);
                });

                const matchingHeader = headers.find(header =>
                    aliases[field].includes(header.toLowerCase().trim())
                );

                if (matchingHeader) {
                    select.value = matchingHeader;
                }
            });

            // Show the mapping interface.
            columnMapping.hidden = false;
            columnMapping.scrollIntoView({ behavior: "smooth", block: "nearest" });

            return;

            if (results.errors.length > 0) {
                alert("Some CSV rows contain formatting issues. Please check the file and try again.");
                csvUpload.value = "";
                return;
            }

        },

        error: function () {
            alert("The CSV file could not be read. Please try another file.");
            csvUpload.value = "";
        }
    });

});


// =========================
// CLEAR SECURITY LOGS
// =========================

const clearLogsButton = document.getElementById("clear-logs");

clearLogsButton.addEventListener("click", function () {

    // Clear the current security logs
    securityLogs.length = 0;

    // Reset all statistics
    document.getElementById("total-events").textContent = 0;
    document.getElementById("successful-logins").textContent = 0;
    document.getElementById("failed-logins").textContent = 0;
    document.getElementById("security-alerts").textContent = 0;

    // Reset the alerts panel
    alertsContainer.innerHTML = `
        <p class="empty-message">
            Upload a CSV file to analyze security activity.
        </p>
    `;

    // Reset the logs table
    logsTable.innerHTML = `
        <tr>
            <td colspan="5" class="empty-message">
                Upload a CSV file to view security logs.
            </td>
        </tr>
    `;

    // Reset the search and filter
    searchInput.value = "";
    statusFilter.value = "All";

    // Allow the same CSV file to be selected again
    csvUpload.value = "";

});


 // =========================
 // DOWNLOAD SECURITY REPORT
 // =========================

const downloadReportButton =
    document.getElementById("download-report");

downloadReportButton.addEventListener("click", function () {

    if (securityLogs.length === 0) {
        alert("Please upload a CSV file before downloading a report.");
        return;
    }

    const total = securityLogs.length;

    const successful = securityLogs.filter(
        log => log.status === "Success"
    ).length;

    const failed = securityLogs.filter(
        log => log.status === "Failed"
    ).length;

    // Count failed login attempts by IP address
    const attemptsByIP = {};

    securityLogs.forEach(log => {
        if (log.status === "Failed") {
            attemptsByIP[log.ip] =
                (attemptsByIP[log.ip] || 0) + 1;
        }
    });

    const reportAlerts = Object.entries(attemptsByIP)
        .filter(([ip, attempts]) => attempts >= 5);

    let report = "THREATWATCH - SECURITY ANALYSIS REPORT\n";
    report += "======================================\n\n";

    report += `Report Generated: ${new Date().toLocaleString()}\n\n`;

    report += "SECURITY STATISTICS\n";
    report += "-------------------\n";
    report += `Total Events: ${total}\n`;
    report += `Successful Logins: ${successful}\n`;
    report += `Failed Logins: ${failed}\n`;
    report += `Security Alerts: ${reportAlerts.length}\n\n`;

    report += "SECURITY ALERTS\n";
    report += "---------------\n";

    if (reportAlerts.length === 0) {
        report += "No suspicious activity detected.\n";
    } else {
        reportAlerts.forEach(([ip, attempts]) => {
            report += `WARNING: ${attempts} failed login attempts from ${ip}\n`;
        });
    }

    report += "\nSECURITY LOGS\n";
    report += "-------------\n";

    securityLogs.forEach(log => {
        report += `${log.timestamp} | ${log.username} | ${log.ip} | ${log.event} | ${log.status}\n`;
    });

    const file = new Blob([report], {
        type: "text/plain;charset=utf-8"
    });

    const downloadURL = URL.createObjectURL(file);
    const link = document.createElement("a");

    link.href = downloadURL;
    link.download = "ThreatWatch-Security-Report.txt";

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(downloadURL);

});