export default function Home() {
  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      justifyContent: "center", 
      alignItems: "center", 
      height: "100vh", 
      backgroundColor: "#f5f5f5",
      fontFamily: "Arial, sans-serif" 
    }}>
      <h1 style={{ fontSize: "4rem", color: "#333" }}>Stocker</h1>
      <div style={{ marginTop: "20px" }}>
        <button style={{
          padding: "10px 20px",
          fontSize: "1rem",
          backgroundColor: "transparent",
          color: "#000",
          border: "1px solid #393939",
          borderRadius: "5px",
          cursor: "pointer",
          marginRight: "10px"
        }}>
          Login
        </button>
        <button style={{
          padding: "10px 20px",
          fontSize: "1rem",
          backgroundColor: "#f05d31",
          border: "1px solid #393939",
          color: "#fff",
          borderRadius: "5px",
          cursor: "pointer"
        }}>
          Register
        </button>
      </div>
    </div>
  );
}
