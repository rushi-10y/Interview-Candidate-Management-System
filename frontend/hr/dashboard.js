document.addEventListener("DOMContentLoaded", () => {
    loadCandidates();

    document
        .getElementById("searchInput")
        .addEventListener("input", loadCandidates);

    document
        .getElementById("filterStatus")
        .addEventListener("change", loadCandidates);
});

async function loadCandidates() {
    const search = document.getElementById("searchInput").value.trim();
    const status = document.getElementById("filterStatus").value;

    const url = `http://localhost:5000/api/candidates?search=${encodeURIComponent(
        search
    )}&status=${encodeURIComponent(status)}`;

    try {
        const res = await fetch(url);
        console.log("Response status:", res.status);
        const data = await res.json();
        console.log("Fetched data:", data);
        renderTable(data.data || []);
    } catch (err) {
        console.error("Failed to fetch candidates", err);
    }
}

function renderTable(candidates) {
    const tbody = document.getElementById("candidateTableBody");
    tbody.innerHTML = "";

    if (!candidates.length) {
        tbody.innerHTML = `<tr><td colspan="5">No candidates found</td></tr>`;
        return;
    }

    candidates.forEach((c) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>
                <strong>${c.full_name}</strong><br />
                <small>${c.experience} yrs</small>
            </td>
            <td>
                ${c.email}<br />
                ${c.phone}
            </td>
            <td>${c.position}</td>
            <td>
                <select onchange="updateStatus('${c._id}', this.value)">
                    <option value="Applied" ${c.status === "Applied" ? "selected" : ""}>Applied</option>
                    <option value="Selected" ${c.status === "Selected" ? "selected" : ""}>Selected</option>
                    <option value="Hold" ${c.status === "Hold" ? "selected" : ""}>Hold</option>
                    <option value="Rejected" ${c.status === "Rejected" ? "selected" : ""}>Rejected</option>
                </select>
            </td>
            <td>
                <a href="http://localhost:5000/api/candidates/${c._id}/resume">
                    Download
                </a>
            </td>
        `;

        tbody.appendChild(row);
    });
}

async function updateStatus(id, status) {
    try {
        await fetch(`http://localhost:5000/api/candidates/${id}/status`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status })
        });
    } catch (err) {
        console.error("Status update failed", err);
    }
}
