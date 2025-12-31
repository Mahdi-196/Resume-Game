import { Text } from '@react-three/drei';
import { BackButton } from '../shared/BackButton';
import { LinkWithProgress } from '../shared/LinkWithProgress';
import { CopyEmailButton } from '../shared/CopyEmailButton';
import { COLORS, SHARED_MATERIALS, TEXT_CONFIG } from '../constants';
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
        fontSize={isMobile ? 0.35 : 0.32}
        color={COLORS.gold}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.05}
        fontWeight="bold"
        material-depthWrite={false}
        material-toneMapped={false}
        renderOrder={1}
      >
        SUBJECT PROFILE
      </Text>

      {/* About Section */}
      <Text
        position={[0, 1.9, 0.04]}
        fontSize={isMobile ? 0.18 : 0.16}
        color="#490000"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.03}
        fontWeight="bold"
        material-depthWrite={false}
        material-toneMapped={false}
        renderOrder={1}
      >
        ABOUT ME
      </Text>
      <Text
        position={[0, 1.5, 0.04]}
        fontSize={isMobile ? 0.14 : 0.13}
        color={COLORS.darkBrown}
        anchorX="center"
        anchorY="top"
        maxWidth={isMobile ? 9.5 : 10.5}
        lineHeight={1.6}
        textAlign="center"
        material-depthWrite={false}
        material-toneMapped={false}
        renderOrder={1}
      >
        I'm a problem solver who happens to love infrastructure. With my AWS Solutions Architect certification and practical experience managing live production systems, I've found my sweet spot at the intersection of development and operations.

        Right now, I'm maintaining a platform that serves over 100+ users in production, handling everything from Terraform deployments to Linux system administration and VPC networking. One of my proudest achievements is building a Multi Region Disaster Recovery system that can recover in under a minute.

        What makes my approach different is that I started as a developer. I don't just deploy infrastructure; I understand the applications running on it. This perspective helps me automate smartly and design cloud architectures that developers actually want to work with. My project ReFocused shows this complete thinking: I built the application from scratch, then architected the entire AWS microservices deployment to run it at scale.

        I'm someone who figures things out. If I don't know how to build something, I learn. This entire interactive 3D portfolio website is my favorite example of that.
      </Text>

      {/* Certifications Header - Centered */}
      <Text
        position={[0, -0.7, 0.04]}
        fontSize={isMobile ? 0.18 : 0.15}
        color="#490000"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
        material-depthWrite={false}
        material-toneMapped={false}
        renderOrder={1}
      >
        CERTIFICATIONS
      </Text>

      {/* AWS Certification - Left Side */}
      <Text
        position={[-1.8, -1.1, 0.04]}
        fontSize={isMobile ? 0.12 : 0.11}
        color={COLORS.darkBrown}
        anchorX="center"
        anchorY="middle"
        material-depthWrite={false}
        material-toneMapped={false}
        renderOrder={1}
      >
        Solutions Architect - Associate
      </Text>
      <Text
        position={[-1.8, -1.3, 0.04]}
        fontSize={isMobile ? 0.1 : 0.09}
        color={COLORS.darkBrown}
        anchorX="center"
        anchorY="middle"
        material-depthWrite={false}
        material-toneMapped={false}
        renderOrder={1}
      >
        Amazon Web Services
      </Text>
      <group
        position={[-1.8, -1.5, 0.04]}
        onClick={(e) => {
          e.stopPropagation();
          window.open('https://www.credly.com/badges/db71c311-6332-4930-aba1-0f48d8549bc6/public_url', '_blank');
        }}
        onPointerEnter={() => (document.body.style.cursor = 'pointer')}
        onPointerLeave={() => (document.body.style.cursor = 'auto')}
      >
        <Text
          fontSize={isMobile ? 0.11 : 0.1}
          color="#5A1F01"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
          material-depthWrite={false}
          material-toneMapped={false}
          renderOrder={1}
        >
          🔗 View Certificate
        </Text>
      </group>

      {/* ASU Software Engineering - Right Side */}
      <Text
        position={[1.8, -1.1, 0.04]}
        fontSize={isMobile ? 0.12 : 0.11}
        color={COLORS.darkBrown}
        anchorX="center"
        anchorY="middle"
        material-depthWrite={false}
        material-toneMapped={false}
        renderOrder={1}
      >
        Certificate of Software Engineering
      </Text>
      <Text
        position={[1.8, -1.3, 0.04]}
        fontSize={isMobile ? 0.1 : 0.09}
        color={COLORS.darkBrown}
        anchorX="center"
        anchorY="middle"
        material-depthWrite={false}
        material-toneMapped={false}
        renderOrder={1}
      >
        Arizona State University
      </Text>
      <group
        position={[1.8, -1.5, 0.04]}
        onClick={(e) => {
          e.stopPropagation();
          window.open('https://badges.parchment.com/public/assertions/YSBgKFxISay3enxxD8Oxfw?identity__email=mahdighaleb196@gmail.com', '_blank');
        }}
        onPointerEnter={() => (document.body.style.cursor = 'pointer')}
        onPointerLeave={() => (document.body.style.cursor = 'auto')}
      >
        <Text
          fontSize={isMobile ? 0.11 : 0.1}
          color="#5A1F01"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
          material-depthWrite={false}
          material-toneMapped={false}
          renderOrder={1}
        >
          🔗 View Certificate
        </Text>
      </group>

      {/* Contact Information */}
      <Text
        position={[0, -2.1, 0.04]}
        fontSize={isMobile ? 0.18 : 0.15}
        color="#490000"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
        material-depthWrite={false}
        material-toneMapped={false}
        renderOrder={1}
      >
        CONTACT INFORMATION
      </Text>

      {/* Contact Links */}
      <LinkWithProgress
        position={[-3.5, -2.5, 0.04]}
        url="https://linkedin.com/in/mahdighaleb"
        label="💼 LinkedIn"
      />
      <CopyEmailButton
        position={[0, -2.5, 0.04]}
        email="mahdighaleb196@gmail.com"
      />
      <LinkWithProgress
        position={[3.5, -2.5, 0.04]}
        url="https://github.com/Mahdi-196"
        label="💻 GitHub"
      />
    </group>
  );
};
