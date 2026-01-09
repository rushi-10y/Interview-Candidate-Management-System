document.getElementById("candidateForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = e.target;
    const submitBtn = document.getElementById("submitBtn");
    const statusMsg = document.getElementById("statusMsg");
    const formData = new FormData(form);

    submitBtn.disabled = true;
    submitBtn.innerText = "Submitting...";

    try {
        const response = await fetch("http://localhost:5000/api/candidates", {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        statusMsg.style.display = "block";

        if (response.ok) {
            statusMsg.className = "status-message success";
            statusMsg.innerText = result.message || "Application submitted successfully!";
            form.reset();
        } else {
            statusMsg.className = "status-message error";
            statusMsg.innerText = result.error || "Submission failed";
            submitBtn.disabled = false;
            submitBtn.innerText = "Submit Application";
        }

    } catch (error) {
        statusMsg.style.display = "block";
        statusMsg.className = "status-message error";
        statusMsg.innerText = "Server error. Please try again later.";
        submitBtn.disabled = false;
        submitBtn.innerText = "Submit Application";
    }
});
