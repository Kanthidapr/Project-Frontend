import "./ProfileCard.css";
 
function ProfileCard({ user }) {
  return (
    <div className="profile-card">
      <div className="pc-header">
        <img src={user.avatar} alt="avatar" />
        <h2>{user.name}</h2>
      </div>
 
      <div className="pc-body">
        <p><b>USERNAME:</b> {user.username}</p>
        <p><b>USERID:</b> {user.id}</p>
      </div>
    </div>
  );
}
 
export default ProfileCard;
 