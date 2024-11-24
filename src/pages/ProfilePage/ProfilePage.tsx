import rootStore from '@shared/stores/RootStore';

const ProfilePage = () => {
  const user = rootStore.user;
  return (
    <div>
      {user.user.name}
    </div>
  );
};

export default ProfilePage;