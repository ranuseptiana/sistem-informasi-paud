<template>
    <div class="main-content">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item active" aria-current="page">Dashboard</li>
        </ol>
      </nav>
  
      <h4 style="
        font-weight: 800; 
        color: #336C2A;
        margin-top: 1.2rem;">Welcome back, admin!
      </h4>
  
      <div class="card-container">
      <router-link to="/adminmainsidebar/student" class="card-dashboard">
        <img src="/src/assets/stud-green.png" alt="Student Icon" class="dashboard-icon" />
        <div class="text-content">
          <h2>Students</h2>
          <h5>50</h5>
        </div>
      </router-link>

      <router-link to="/teachers" class="card-dashboard">
        <img src="/src/assets/teacher-green.png" alt="Teacher Icon" class="dashboard-icon" />
        <div class="text-content">
          <h2>Teachers</h2>
          <h5>10</h5>
        </div>
      </router-link>
    </div>
    </div>
  </template>
  
<style>
.main-content {
    margin-top: -15.2rem;
    margin-left: -28rem;
    display: flex;
    flex-direction: column; /* Keep content stacked */
}

.card-container {
  display: flex;
  gap: 20px; /* Space between cards */
  flex-wrap: wrap; /* Allow cards to wrap to the next line if the screen is too small */
}
  
h4 {
    margin-left: -17.8rem;
}
  
.card-dashboard {
    margin-top: 1rem;
    display: flex;
    align-items: center;
    padding: 20px;
    background-color: #fff;
    border: 1px solid #D5D5D5;
    border-radius: 8px;
    width: 250px;
    gap: 20px; /* Adds space between the icon and the text */
    text-decoration: none; /* Removes underline */
    color: inherit; /* Inherit text color */
    transition: transform 0.3s ease; /* For hover effect */
}

.card-dashboard:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(180, 180, 180, 0.3);
}
  
/* Default image */
.dashboard-icon {
  width: 48px;
  height: 48px;
  transition: all 0.3s ease;
  margin-left: 0.5rem;
}

.material-symbols-outlined {
    font-size: 48px; /* Adjust icon size */
    color: #336C2A;
}
  
.text-content {
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
    justify-content: space-between; /* Align top and bottom */
    height: 100%; /* Ensures that the content uses the full height for vertical alignment */
}
  
.text-content h2{
    margin: 0;
    font-size: 1.5rem;
    font-weight: 800;
    color: #336C2A;
    align-self: flex-start;
}
  
.text-content h5 {
    margin: 0;
    font-size: 1.3rem;
    font-weight: 400;
    color: #336C2A;
    align-self: flex-start;
}
</style>
  