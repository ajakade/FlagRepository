function FlagCard({ country }) {
  return (
    <div className="card h-100 shadow-sm border-0 overflow-hidden hover-card">
      <div className="flag-image-container" style={{ height: "180px", overflow: "hidden" }}>
        <img
          className="card-img-top w-100 h-100"
          style={{ objectFit: "cover" }}
          src={country.flags.svg}
          alt={`Drapeau de ${country.name.common}`}
        />
      </div>
      <div className="card-body text-center">
        <h5 className="card-title fw-bold text-dark">{country.name.common}</h5>
      </div>
    </div>
  );
}

export default FlagCard;
