
import React from 'react';
import { GcpIcon, NvidiaIcon, DockerIcon, CloudRunIcon, VertexAiIcon, GeminiIcon } from '../components/icons/TechIcons';

export interface TechIconData {
  Icon: React.FC;
  id: string; // 'gcp', 'cloudRun', etc.
  shortName: string;
  color: string;
}

export const techIcons: TechIconData[] = [
    {
        Icon: GcpIcon,
        id: 'gcp',
        shortName: 'Google Cloud',
        color: '#4285F4',
    },
    {
        Icon: CloudRunIcon,
        id: 'cloudRun',
        shortName: 'Cloud Run',
        color: '#4285F4',
    },
    {
        Icon: VertexAiIcon,
        id: 'vertexAi',
        shortName: 'Vertex AI',
        color: '#4285F4',
    },
    {
        Icon: DockerIcon,
        id: 'docker',
        shortName: 'Microservices',
        color: '#2496ED',
    },
    {
        Icon: GeminiIcon,
        id: 'gemini',
        shortName: 'Google Gemini',
        color: '#c084fc',
    },
    {
        Icon: NvidiaIcon,
        id: 'nvidia',
        shortName: 'NVIDIA GPUs/NIM',
        color: '#76B900',
    },
];
