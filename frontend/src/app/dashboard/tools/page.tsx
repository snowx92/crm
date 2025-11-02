'use client';

import { motion } from 'framer-motion';
import { Download, ExternalLink, Mail, MapPin, MessageSquare, Workflow } from 'lucide-react';

export default function ToolsPage() {
  const tools = [
    {
      id: 'google-maps-scraper',
      title: 'Google Maps Scraper',
      description: 'Search with keywords and export business data to Excel from Google Maps',
      icon: MapPin,
      color: 'blue',
      link: 'http://165.22.164.180:8000/',
      type: 'web',
      features: [
        'Search by keyword',
        'Export to Excel',
        'Business details extraction',
        'Location data'
      ]
    },
    {
      id: 'whatsapp-bulk-messenger',
      title: 'WhatsApp Bulk Messenger',
      description: 'Desktop application for sending bulk WhatsApp messages',
      icon: MessageSquare,
      color: 'green',
      type: 'external',
      downloads: [
        {
          platform: 'macOS',
          file: 'https://drive.google.com/file/d/1Y662cSX9gZDwAu_LelT1GPoFXF8boDFZ/view?usp=sharing',
          label: 'Download for macOS'
        },
        {
          platform: 'Windows',
          file: 'https://drive.google.com/file/d/1fVB8p_Z8NH84HnWHYvQTlLArSsUDDqZ0/view?usp=sharing',
          label: 'Download for Windows'
        }
      ],
      features: [
        'Bulk message sending',
        'Contact management',
        'Message templates',
        'Cross-platform support'
      ]
    },
    {
      id: 'email-automation',
      title: 'Email Automation (n8n)',
      description: 'Automated email summarization, reply generation, and Google Sheets integration',
      icon: Mail,
      color: 'purple',
      type: 'external',
      downloads: [
        {
          platform: 'n8n Workflow',
          file: 'https://drive.google.com/file/d/1XwkYtvDbNroa8ZzoQZ8GuxCIgUGxiPSJ/view?usp=sharing',
          label: 'Download Workflow JSON'
        }
      ],
      features: [
        'Email summarization with AI',
        'Automatic reply generation',
        'Google Sheets integration',
        'Gmail automation'
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          bg: 'bg-blue-50',
          icon: 'text-blue-600',
          button: 'bg-blue-600 hover:bg-blue-700',
          border: 'border-blue-200'
        };
      case 'green':
        return {
          bg: 'bg-green-50',
          icon: 'text-green-600',
          button: 'bg-green-600 hover:bg-green-700',
          border: 'border-green-200'
        };
      case 'purple':
        return {
          bg: 'bg-purple-50',
          icon: 'text-purple-600',
          button: 'bg-purple-600 hover:bg-purple-700',
          border: 'border-purple-200'
        };
      default:
        return {
          bg: 'bg-gray-50',
          icon: 'text-gray-600',
          button: 'bg-gray-600 hover:bg-gray-700',
          border: 'border-gray-200'
        };
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <Workflow className="w-8 h-8 text-blue-600" />
          Company Tools
        </h1>
        <p className="text-gray-600 mt-1">Essential tools and applications for your business operations</p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {tools.map((tool, index) => {
          const Icon = tool.icon;
          const colors = getColorClasses(tool.color);

          return (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-lg shadow-sm border-2 ${colors.border} hover:shadow-md transition-all overflow-hidden`}
            >
              {/* Card Header */}
              <div className={`${colors.bg} p-6 border-b-2 ${colors.border}`}>
                <div className="flex items-start gap-4">
                  <div className={`p-3 bg-white rounded-lg shadow-sm`}>
                    <Icon className={`w-8 h-8 ${colors.icon}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800">{tool.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{tool.description}</p>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Features:</h4>
                  <ul className="space-y-2">
                    {tool.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <span className={`w-1.5 h-1.5 rounded-full ${colors.icon.replace('text-', 'bg-')}`}></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  {tool.type === 'web' && tool.link && (
                    <a
                      href={tool.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full px-4 py-3 ${colors.button} text-white rounded-lg transition-colors flex items-center justify-center gap-2 font-medium`}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Open Tool
                    </a>
                  )}

                  {tool.type === 'external' && tool.downloads && (
                    <>
                      {tool.downloads.map((download, idx) => (
                        <a
                          key={idx}
                          href={download.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-full px-4 py-3 ${colors.button} text-white rounded-lg transition-colors flex items-center justify-center gap-2 font-medium`}
                        >
                          <ExternalLink className="w-4 h-4" />
                          {download.label}
                        </a>
                      ))}
                    </>
                  )}

                  {tool.type === 'download' && tool.downloads && (
                    <>
                      {tool.downloads.map((download, idx) => (
                        <a
                          key={idx}
                          href={download.file}
                          download
                          className={`w-full px-4 py-3 ${colors.button} text-white rounded-lg transition-colors flex items-center justify-center gap-2 font-medium`}
                        >
                          <Download className="w-4 h-4" />
                          {download.label}
                        </a>
                      ))}
                    </>
                  )}

                  {tool.type === 'workflow' && tool.downloads && (
                    <>
                      {tool.downloads.map((download, idx) => (
                        <a
                          key={idx}
                          href={download.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-full px-4 py-3 ${colors.button} text-white rounded-lg transition-colors flex items-center justify-center gap-2 font-medium`}
                        >
                          <ExternalLink className="w-4 h-4" />
                          {download.label}
                        </a>
                      ))}
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-600">
                          <span className="font-semibold">Setup Instructions:</span> Download this JSON file from the link above and import it into your n8n instance to set up the email automation workflow.
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Info Section */}
      <div className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
          <Workflow className="w-5 h-5 text-blue-600" />
          About These Tools
        </h3>
        <p className="text-gray-700 text-sm leading-relaxed">
          These tools are designed to streamline your business operations. The Google Maps Scraper helps you gather business data for lead generation.
          WhatsApp Bulk Messenger enables efficient customer communication at scale. The Email Automation workflow uses AI to summarize incoming emails,
          generate responses, and automatically update your Google Sheets for seamless workflow management.
        </p>
      </div>

      {/* Support Section */}
      <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-2">Need Help?</h3>
        <p className="text-gray-700 text-sm">
          If you need assistance with any of these tools or have questions about setup and configuration, please contact your system administrator.
        </p>
      </div>
    </div>
  );
}
