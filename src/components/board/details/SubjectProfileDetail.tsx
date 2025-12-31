import { Text } from '@react-three/drei';
import { BackButton } from '../shared/BackButton';
import { LinkWithProgress } from '../shared/LinkWithProgress';
import { CopyEmailButton } from '../shared/CopyEmailButton';
import { COLORS, SHARED_MATERIALS } from '../constants';
import { DetailViewProps } from '../types';
import { getTextScale, isMobileDevice } from '@/utils/detectMobile';

/**
 * Subject Profile Detail - Professional background and credentials
 */
export const SubjectProfileDetail = ({ onBack }: DetailViewProps) => {
  const textScale = getTextScale();
  const isMobile = isMobileDevice();

  return (
    <group>
      {/* Back button at the top */}
      <BackButton onClick={onBack} position={[-5.5, 2.8, 0.04]} />

      {/* Header Banner */}
      <mesh position={[0, 2.5, 0.03]}>
        <planeGeometry args={[11, 0.7]} />
        <primitive object={SHARED_MATERIALS.darkRed} attach="material" />
      </mesh>
      <Text
        position={[0, 2.5, 0.04]}
        fontSize={isMobile ? 0.25 : 0.32}
        color={COLORS.gold}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.03}
      >
        SUBJECT PROFILE
      </Text>

      {/* About Section */}
      <Text
        position={[0, 1.8, 0.04]}
        fontSize={isMobile ? 0.13 : 0.15}
        color={COLORS.copper}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.02}
      >
        ABOUT ME
      </Text>
      <Text
        position={[0, 1.45, 0.04]}
        fontSize={isMobile ? 0.09 : 0.11}
        color={COLORS.darkBrown}
        anchorX="center"
        anchorY="top"
        maxWidth={isMobile ? 9 : 10}
        lineHeight={1.5}
        textAlign="center"
      >
        I'm a problem solver who happens to love infrastructure. With my AWS Solutions Architect certification and practical experience managing live production systems, I've found my sweet spot at the intersection of development and operations.

        Right now, I'm maintaining a platform that serves over 100+ users in production, handling everything from Terraform deployments to Linux system administration and VPC networking. One of my proudest achievements is building a Multi Region Disaster Recovery system that can recover in under a minute.

        What makes my approach different is that I started as a developer. I don't just deploy infrastructure; I understand the applications running on it. This perspective helps me automate smartly and design cloud architectures that developers actually want to work with. My project ReFocused shows this complete thinking: I built the application from scratch, then architected the entire AWS microservices deployment to run it at scale.

        I'm someone who figures things out. If I don't know how to build something, I learn. This entire interactive 3D portfolio website is my favorite example of that.
      </Text>

      {/* Location */}
      <Text
        position={[-5, -0.2, 0.04]}
        fontSize={isMobile ? 0.12 : 0.15}
        color={COLORS.copper}
        anchorX="left"
        anchorY="middle"
      >
        LOCATION
      </Text>
      <Text
        position={[-5, -0.45, 0.04]}
        fontSize={isMobile ? 0.09 : 0.11}
        color={COLORS.darkBrown}
        anchorX="left"
        anchorY="middle"
      >
        Phoenix, Arizona
      </Text>
      <Text
        position={[-5, -0.65, 0.04]}
        fontSize={isMobile ? 0.09 : 0.11}
        color={COLORS.darkBrown}
        anchorX="left"
        anchorY="middle"
      >
        United States
      </Text>

      {/* Certifications */}
      <Text
        position={[5, -0.2, 0.04]}
        fontSize={isMobile ? 0.12 : 0.15}
        color={COLORS.copper}
        anchorX="right"
        anchorY="middle"
      >
        CERTIFICATIONS
      </Text>

      {/* AWS Certification */}
      <Text
        position={[5, -0.5, 0.04]}
        fontSize={isMobile ? 0.09 : 0.11}
        color={COLORS.darkBrown}
        anchorX="right"
        anchorY="middle"
      >
        AWS Solutions Architect - Associate
      </Text>
      <Text
        position={[5, -0.7, 0.04]}
        fontSize={isMobile ? 0.08 : 0.11}
        color={COLORS.darkBrown}
        anchorX="right"
        anchorY="middle"
      >
        Amazon Web Services | Dec 2025 - Dec 2028
      </Text>
      <group
        position={[5, -0.9, 0.04]}
        onClick={(e) => {
          e.stopPropagation();
          window.open('https://www.credly.com/badges/db71c311-6332-4930-aba1-0f48d8549bc6/public_url', '_blank');
        }}
        onPointerEnter={() => (document.body.style.cursor = 'pointer')}
        onPointerLeave={() => (document.body.style.cursor = 'auto')}
      >
        <Text
          fontSize={isMobile ? 0.08 : 0.1}
          color="#742B03"
          anchorX="right"
          anchorY="middle"
        >
          🔗 View Certificate
        </Text>
      </group>

      {/* ASU Software Engineering */}
      <Text
        position={[5, -1.2, 0.04]}
        fontSize={isMobile ? 0.09 : 0.11}
        color={COLORS.darkBrown}
        anchorX="right"
        anchorY="middle"
      >
        Arizona State University
      </Text>
      <Text
        position={[5, -1.4, 0.04]}
        fontSize={isMobile ? 0.08 : 0.11}
        color={COLORS.darkBrown}
        anchorX="right"
        anchorY="middle"
      >
        Software Engineering Certificate
      </Text>
      <Text
        position={[5, -1.6, 0.04]}
        fontSize={isMobile ? 0.08 : 0.11}
        color={COLORS.darkBrown}
        anchorX="right"
        anchorY="middle"
      >
        Nov 2024 - May 2025
      </Text>
      <group
        position={[5, -1.8, 0.04]}
        onClick={(e) => {
          e.stopPropagation();
          window.open('https://badges.parchment.com/public/assertions/YSBgKFxISay3enxxD8Oxfw?identity__email=mahdighaleb196@gmail.com', '_blank');
        }}
        onPointerEnter={() => (document.body.style.cursor = 'pointer')}
        onPointerLeave={() => (document.body.style.cursor = 'auto')}
      >
        <Text
          fontSize={isMobile ? 0.08 : 0.1}
          color="#742B03"
          anchorX="right"
          anchorY="middle"
        >
          🔗 View Certificate
        </Text>
      </group>

      {/* Contact Information */}
      <Text
        position={[0, -2.3, 0.04]}
        fontSize={isMobile ? 0.12 : 0.15}
        color={COLORS.copper}
        anchorX="center"
        anchorY="middle"
      >
        CONTACT INFORMATION
      </Text>

      {/* Contact Links */}
      <LinkWithProgress
        position={[-3.5, -2.7, 0.04]}
        url="https://linkedin.com/in/mahdighaleb"
        label="💼 LinkedIn"
      />
      <CopyEmailButton
        position={[0, -2.7, 0.04]}
        email="mahdighaleb196@gmail.com"
      />
      <LinkWithProgress
        position={[3.5, -2.7, 0.04]}
        url="https://github.com/Mahdi-196"
        label="💻 GitHub"
      />
    </group>
  );
};
