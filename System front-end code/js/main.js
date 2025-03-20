document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const currentUserElement = document.getElementById('currentUser');
    const logoutBtn = document.getElementById('logoutBtn');
    const sidebarLinks = document.querySelectorAll('.sidebar-menu a');
    const contentPages = document.querySelectorAll('.content-page');
    const currentPageElement = document.getElementById('currentPage');
    const detectionForm = document.getElementById('detectionForm');
    const resultCard = document.getElementById('resultCard');
    const resultContent = document.getElementById('resultContent');
    const historyTableBody = document.getElementById('historyTableBody');
    
    // Check if user is logged in
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        // Not logged in, redirect to login page
        window.location.href = 'index.html';
        return;
    }
    
    // Display current username
    currentUserElement.textContent = `Welcome, ${currentUser}`;
    
    // Logout
    logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    });
    
    // Sidebar navigation
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active link
            sidebarLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding page
            const targetPage = this.getAttribute('data-page');
            contentPages.forEach(page => {
                page.style.display = 'none';
                if (page.id === targetPage + 'Page') {
                    page.style.display = 'block';
                }
            });
            
            // Update breadcrumb navigation
            currentPageElement.textContent = this.querySelector('span').textContent;
            
            // If it's history page, load history records
            if (targetPage === 'history') {
                loadHistoryRecords();
            }
        });
    });
    
    // Handle detection form submission
    document.getElementById('detectionForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Collect form data
        const formData = {
            "Pregnancies": parseInt(document.getElementById('pregnancies').value),
            "Glucose": parseInt(document.getElementById('glucose').value),
            "BMI": parseFloat(document.getElementById('bmi').value),
            "DiabetesPedigreeFunction": parseFloat(document.getElementById('dpf').value),
            "Age": parseInt(document.getElementById('age').value)
        };
    
        try {
            // Send POST request to backend
            const response = await fetch('http://127.0.0.1:5000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
    
            if (!response.ok) {
                throw new Error('Network request failed');
            }
    
            const result = await response.json();
            
            // Display results
            const resultCard = document.getElementById('resultCard');
            const resultContent = document.getElementById('resultContent');
            resultContent.innerHTML = `
                <p>Test results: ${result.Prediction === 1 ? 
                    '<span class="result-positive">High risk of diabetes</span>' : 
                    '<span class="result-negative">Low risk of diabetes</span>'}
                </p>
            `;
            resultCard.style.display = 'block';
    
        } catch (error) {
            console.error('Error:', error);
            alert('Test failed, please try again later');
        }
    });
    
    // Save detection record to local storage
    function saveDetectionRecord(record) {
        const currentUser = localStorage.getItem('currentUser');
        const storageKey = `${currentUser}_history`;
        
        let history = JSON.parse(localStorage.getItem(storageKey)) || [];
        history.push(record);
        
        localStorage.setItem(storageKey, JSON.stringify(history));
    }
    
    // Load history records
    async function loadHistoryRecords() {
        try {
            // Get data from backend
            const response = await fetch('http://127.0.0.1:5000/records');
            if (!response.ok) {
                throw new Error('Network request failed');
            }
            const records = await response.json();
            
            // Clear table
            historyTableBody.innerHTML = '';
            
            // If no records
            if (records.length === 0) {
                historyTableBody.innerHTML = '<tr><td colspan="6" style="text-align: center;">No test record</td></tr>';
                return;
            }
            
            // Sort records in reverse order
            records.reverse();
            
            // Add records to table
            records.forEach(record => {
                const row = document.createElement('tr');
                
                // Set row content
                row.innerHTML = `
                    <td>${record.Pregnancies}</td>
                    <td>${record.Glucose}</td>
                    <td>${record.BMI}</td>
                    <td>${record.DiabetesPedigreeFunction}</td>
                    <td>${record.Age}</td>
                    <td class="${record.Outcome === 1 ? 'result-positive' : 'result-negative'}">
                        ${record.Outcome === 1 ? 'High risk of diabetes' : 'Low risk of diabetes'}
                    </td>
                `;
                
                historyTableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error:', error);
            historyTableBody.innerHTML = '<tr><td colspan="6" style="text-align: center;">Failed to load records</td></tr>';
        }
    }
});