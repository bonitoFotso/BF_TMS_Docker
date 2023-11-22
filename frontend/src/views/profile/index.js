import React from 'react';
import { Avatar, Descriptions, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const PageDeProfil = () => {
  const urlImageAvatar = 'votre-url-image-avatar';
  const nom = 'Votre Nom';
  const email = 'votreemail@example.com';
  const téléphone = '123-456-7890';
  const adresse = '123, rue Principale, Ville, Pays';
  const siteWeb = 'www.exampledd.com';

  return (
    <div style={{ padding: '20px' }}>
      <Avatar size={128} src={urlImageAvatar} />

      <Descriptions title="Profil" bordered style={{ marginTop: '20px' }}>
        <Descriptions.Item label="Nom">{nom}</Descriptions.Item>
        <Descriptions.Item label="Email">{email}</Descriptions.Item>
        <Descriptions.Item label="Téléphone">{téléphone}</Descriptions.Item>
        <Descriptions.Item label="Adresse" span={2}>
          {adresse}
        </Descriptions.Item>
        <Descriptions.Item label="Site Web">{siteWeb}</Descriptions.Item>
      </Descriptions>

      <div style={{ marginTop: '20px' }}>
        <Title level={2}>À propos de moi</Title>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
          enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </Paragraph>
      </div>
    </div>
  );
};

export default PageDeProfil;
