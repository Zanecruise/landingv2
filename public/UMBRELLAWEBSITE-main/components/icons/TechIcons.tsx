import React from 'react';
import { SiGooglecloud, SiNvidia, SiDocker, SiGooglegemini } from 'react-icons/si';
import { FiServer, FiLayers } from 'react-icons/fi';

const IconWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="h-12 w-12 mx-auto flex items-center justify-center text-4xl">
        {children}
    </div>
);

const GcpIcon: React.FC = () => (
    <IconWrapper>
        <SiGooglecloud style={{ color: 'var(--tech-gcp-color)' }} />
    </IconWrapper>
);

const NvidiaIcon: React.FC = () => (
    <IconWrapper>
        <SiNvidia style={{ color: 'var(--tech-nvidia-color)' }} />
    </IconWrapper>
);

const DockerIcon: React.FC = () => (
    <IconWrapper>
        <SiDocker style={{ color: 'var(--tech-docker-color)' }} />
    </IconWrapper>
);

const CloudRunIcon: React.FC = () => (
    <IconWrapper>
         <FiServer style={{ color: 'var(--tech-gcp-color)' }} />
    </IconWrapper>
);

const VertexAiIcon: React.FC = () => (
    <IconWrapper>
        <FiLayers style={{ color: 'var(--tech-gcp-color)' }} />
    </IconWrapper>
);

const GeminiIcon: React.FC = () => (
    <IconWrapper>
        <SiGooglegemini style={{ color: 'var(--tech-gemini-color)' }} />
    </IconWrapper>
);

export {
    GcpIcon,
    NvidiaIcon,
    DockerIcon,
    CloudRunIcon,
    VertexAiIcon,
    GeminiIcon
};