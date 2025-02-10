document.addEventListener("DOMContentLoaded", () => {
    const daySelect = document.getElementById("day")
    const monthSelect = document.getElementById("month")
    const yearSelect = document.getElementById("year")
    const calculateBtn = document.getElementById("calculateBtn")
    const errorDiv = document.getElementById("error")
    const resultDiv = document.getElementById("result")
  
    const currentYear = new Date().getFullYear()
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]
  
    // Populate year options
    for (let i = currentYear; i >= currentYear - 123; i--) {
      const option = document.createElement("option")
      option.value = i
      option.textContent = i
      yearSelect.appendChild(option)
    }
  
    // Populate month options
    months.forEach((month, index) => {
      const option = document.createElement("option")
      option.value = index + 1
      option.textContent = month
      monthSelect.appendChild(option)
    })
  
    // Update days based on selected month and year
    function updateDays() {
      const selectedMonth = Number.parseInt(monthSelect.value)
      const selectedYear = Number.parseInt(yearSelect.value)
      const daysInMonth = selectedMonth && selectedYear ? new Date(selectedYear, selectedMonth, 0).getDate() : 31
  
      daySelect.innerHTML = '<option value="">Day</option>'
      for (let i = 1; i <= daysInMonth; i++) {
        const option = document.createElement("option")
        option.value = i
        option.textContent = i
        daySelect.appendChild(option)
      }
    }
  
    monthSelect.addEventListener("change", updateDays)
    yearSelect.addEventListener("change", updateDays)
  
    calculateBtn.addEventListener("click", calculateAge)
  
    function calculateAge() {
      const day = Number.parseInt(daySelect.value)
      const month = Number.parseInt(monthSelect.value)
      const year = Number.parseInt(yearSelect.value)
  
      if (!day || !month || !year) {
        showError("Please select all date fields")
        return
      }
  
      const birthDate = new Date(year, month - 1, day)
      const today = new Date()
  
      if (birthDate > today) {
        showError("Birth date cannot be in the future")
        return
      }
  
      let years = today.getFullYear() - birthDate.getFullYear()
      let months = today.getMonth() - birthDate.getMonth()
      let days = today.getDate() - birthDate.getDate()
  
      if (days < 0) {
        months--
        const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 0)
        days += lastMonth.getDate()
      }
  
      if (months < 0) {
        years--
        months += 12
      }
  
      showResult(years, months, days)
    }
  
    function showError(message) {
      errorDiv.textContent = message
      errorDiv.style.display = "block"
      resultDiv.style.display = "none"
    }
  
    function showResult(years, months, days) {
      errorDiv.style.display = "none"
      resultDiv.innerHTML = `You are <span>${years}</span> years, <span>${months}</span> months, and <span>${days}</span> days old`
      resultDiv.style.display = "block"
    }
  })
  
  