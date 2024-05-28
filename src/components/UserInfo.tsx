import React from "react";

interface UserInfoProps {
  displayName: string;
  imageUrl: string;
}

const UserInfo: React.FC<UserInfoProps> = ({ displayName, imageUrl }) => {
  return (
    <div>
      <h1>Welcome, {displayName}</h1>
      {imageUrl && (
        <img src={imageUrl} alt="User Avatar" width="100" height="100" />
      )}
    </div>
  );
};

export default UserInfo;
