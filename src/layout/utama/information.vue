<template>
    <Navbar />
  
    <div class="tentang-kami">
      <h3 class="about-head">Pusat Bantuan</h3>
      <h1>BAGAIMANA KITA BISA MEMBANTU?</h1>
      <p>Temukan jawaban dari pertanyaan dari bantuan kami atau hubungi kami.</p>
    </div>
  
    <div class="container">
        <section class="header-question">
            <h4>F A Q</h4>
            <h2>Frequently Asked Question</h2>
        </section>
      
      <section class="question-list">
        <div class="question" v-for="(faq, index) in faqs" :key="index">
          <div class="icon">
           <img src="/src/assets/images/question.png" alt="">
          </div>
          <div class="text">
            <h3>{{ faq.question }}</h3>
            <p>{{ faq.answer }}</p>
          </div>
        </div>
      </section>

      <section class="no-answer">
        <h2>Tidak menemukan jawaban untuk pertanyaan Anda?</h2>
        <p>Hubungi kami melalui nomor yang tertera untuk mendapatkan lebih banyak informasi lebih lanjut</p>
        <a href="https://wa.me/6281335305234"
          class="btn-whatsapp"
          target="_blank"
          rel="noopener"> <i class="fa-brands fa-whatsapp"></i>
          Hubungi via WhatsApp
        </a>
      </section>
    </div>
    <Footer />
  </template>
  
  <script>
  import Navbar from "../navbar.vue";
  import Footer from "../footer.vue";
  
  export default {
    components: {
      Navbar,
      Footer,
    },
    data() {
      return {
        faqs: [
          {
            question: "Apa itu PAUD Al Ummah?",
            answer:
              "PAUD Al Ummah merupakan lembaga pendidikan anak usia dini yang berkomitmen untuk memberikan pendidikan berkualitas tinggi dengan pendekatan islami.",
          },
          {
            question: "Berapa usia anak yang diterima di PAUD Al Ummah?",
            answer:
              "Kami menerima anak-anak usia 3 hingga 6 tahun untuk bergabung dalam program pendidikan kami.",
          },
          {
            question: "Bagaimana proses penerimaan murid baru di PAUD Al Ummah?",
            answer:
              "Proses penerimaan murid baru meliputi pengisian formulir pendaftaran online sesuai dengan ketentuan yang berlaku.",
          },
          {
            question: "Apa saja kegiatan yang dilakukan di PAUD Al Ummah?",
            answer:
              "Kami menyelenggarakan beragam kegiatan pembelajaran, kreativitas, dan keagamaan seperti belajar mengaji, seni dan keterampilan, serta kegiatan ekstrakurikuler.",
          },
          {
            question:
              "Bagaimana cara memantau perkembangan anak di PAUD Al Ummah?",
            answer:
              "Kami secara berkala memberikan laporan perkembangan anak kepada orang tua melalui rapat orang tua dan pengumuman melalui sistem informasi online kami.",
          },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  /* Tampilan utama */
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .btn-whatsapp {
  display: inline-block;
  background-color: #075E54; /* warna hijau khas WhatsApp */
  color: white;
  padding: 10px 20px;
  margin-top: 15px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.btn-whatsapp:hover {
  background-color: #1ebc59;
}

  
  /* Header */
  .tentang-kami {
    background-color: #336c2a;
    color: white;
    width: 90rem;
    text-align: center;
    padding: 50px 0px;
    border-bottom-left-radius: 100px;
    border-bottom-right-radius: 100px;
    max-width: 100%;
    margin: auto;
  }
  
  .tentang-kami h3 {
    font-size: 15px;
    margin-bottom: 10px;
    font-weight: normal;
  }
  
  .tentang-kami h1 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .tentang-kami p {
    font-size: 14px;
    line-height: 1.6;
    max-width: 600px;
    margin: auto;
    color: #ffff;
  }
  
.header-question {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;
}

.header-question h4 {
    color: #666;
    font-size: 20px;
    font-weight: 200;
}

.header-question h2 {
    font-weight: 800;
}

  /* FAQ section */
  .question-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 80%;
    max-width: 600px;
    margin-top: 20px;
  }
  
  /* Style untuk pertanyaan */
  .question {
    display: flex;
    align-items: flex-start;
    gap: 15px;
    padding: 15px;
    border-bottom: 1px solid #ddd;
  }
  
  /* Ikon tanda tanya */
  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    color: #666;
  }

  .icon img {
    width: 50px;
  }
  
  /* Style teks */
  .text h3 {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .text p {
    font-size: 14px;
    line-height: 1.5;
    color: #444;
  }

  .no-answer {
    margin-top: 2rem;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .no-answer h2 {
    color: #336c2a;
    font-weight: 800;
  }
  </style>
  