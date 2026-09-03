import React from 'react';
import { Card } from '../components/UI';

const PageLayout: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="max-w-4xl mx-auto p-6 py-12">
    <h1 className="text-3xl font-bold text-brand-text mb-8">{title}</h1>
    <Card className="p-8 prose prose-slate max-w-none">
      {children}
    </Card>
  </div>
);

export const HelpSupport: React.FC = () => (
  <PageLayout title="Help & Support">
    <h3 className="text-lg font-semibold mb-4">Frequently Asked Questions</h3>
    <div className="space-y-6 text-brand-textMuted">
      <div>
        <h4 className="font-medium text-brand-text">How long does it take to generate a creative?</h4>
        <p>Most creatives are generated and emailed to you within 24 hours of submission.</p>
      </div>
      <div>
        <h4 className="font-medium text-brand-text">What image formats are supported for jewelry inserts?</h4>
        <p>We support PNG and JPEG formats. For best results, use images with a transparent background.</p>
      </div>
    </div>
    <h3 className="text-lg font-semibold mt-8 mb-4">Contact Us</h3>
    <p className="text-brand-textMuted">Need further assistance? Email us at support@platform.com.</p>
  </PageLayout>
);

export const TermsConditions: React.FC = () => (
  <PageLayout title="Terms & Conditions">
    <p className="text-brand-textMuted mb-4">Last updated: October 26, 2023</p>
    <div className="space-y-4 text-brand-textMuted">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <h3 className="text-lg font-semibold text-brand-text mt-6">1. Use of Service</h3>
      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
    </div>
  </PageLayout>
);

export const PrivacyPolicy: React.FC = () => (
  <PageLayout title="Privacy Policy">
    <p className="text-brand-textMuted mb-4">Last updated: October 26, 2023</p>
    <div className="space-y-4 text-brand-textMuted">
      <p>At Platform, we take your privacy seriously. This policy describes how we collect, use, and handle your personal information.</p>
      <h3 className="text-lg font-semibold text-brand-text mt-6">Information Collection</h3>
      <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
      <h3 className="text-lg font-semibold text-brand-text mt-6">Data Usage</h3>
      <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
    </div>
  </PageLayout>
);
