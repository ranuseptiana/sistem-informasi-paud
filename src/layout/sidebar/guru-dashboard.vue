<template>
<div class="main-content">
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item active" aria-current="page">Beranda</li>
        </ol>
    </nav>

    <h4 style="
            font-weight: 800; 
            color: #336C2A;
            margin-top: 1.2rem;">Selamat Datang, guru!
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

    
<style scoped>
.main-content {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
}

.card-container {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
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
    gap: 20px;
    text-decoration: none;
    color: inherit;
    transition: transform 0.3s ease;
}

.card-dashboard:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(180, 180, 180, 0.3);
}

.dashboard-icon {
    width: 48px;
    height: 48px;
    transition: all 0.3s ease;
    margin-left: 0.5rem;
}

.material-symbols-outlined {
    font-size: 48px;
    color: #336C2A;
}

.text-content {
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
    justify-content: space-between;
    height: 100%;
}

.text-content h2 {
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
