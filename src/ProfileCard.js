import "./ProfileCard.css";

function ProfileCard({ user }) {
  if (!user) return null;

  return (
    <div className="profile-card">
      <div className="pc-header">
        <img src={user.avatar} alt="avatar" />
        <h2>{user.name}</h2>
      </div>

      <div className="pc-body">
        <p><b>USERNAME:</b> {user.username}</p>
        <p><b>USERID:</b> {user.id}</p>

        <button
          style={{
            marginTop: "10px",
            padding: "5px 10px",
            borderRadius: "10px",
            border: "none",
            background: "#ff6b81",
            color: "white",
            cursor: "pointer"
          }}
          onClick={() => {
            localStorage.removeItem("user");
            window.location.reload();
          }}
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
}

export default ProfileCard;