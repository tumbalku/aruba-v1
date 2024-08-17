const About = () => {
  return (
    <>
      <div className="flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center">
        <h1 className="text-4xl sm:text-6xl font-bold leading-none -tracking-tight">
          Apa itu
        </h1>
        <div className="stats primary-color shadow">
          <div className="stat">
            <div className="stat-title text-primary-content text-4xl font-bold tracking-widest">
              ARUBA
            </div>
          </div>
        </div>
      </div>
      <p className="mt-6 text-lg leading-8 max-w-2xl mx-auto">
        <strong>ARUBA</strong> (Administrasi RSUD Unggul Bahteramas) adalah
        platform digital yang dirancang khusus untuk mendukung administrasi
        internal di RSUD Bahteramas. Website ini menyediakan berbagai layanan
        yang bertujuan untuk mempermudah pegawai dalam mengelola dan mengakses
        informasi penting, serta memfasilitasi proses administrasi secara lebih
        efisien dan efektif.
      </p>
    </>
  );
};

export default About;
