'use client';

import Link from 'next/link';
import { ArrowLeft, Mail, MessageSquare, Phone } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-text-muted hover:text-fg mb-8">
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>

        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-lg text-text-muted">
              Ready to transform your security operations? Let's talk.
            </p>
          </div>

          <div className="glass-card p-8">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                  placeholder="john@company.com"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                  placeholder="Security Solutions Inc."
                />
              </div>

              <div>
                <label htmlFor="guards" className="block text-sm font-medium mb-2">
                  Number of Guards
                </label>
                <select
                  id="guards"
                  className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                >
                  <option>1-5</option>
                  <option>6-20</option>
                  <option>21-50</option>
                  <option>50+</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                  placeholder="Tell us about your security needs..."
                />
              </div>

              <button type="submit" className="w-full btn-primary">
                Send Message
              </button>
            </form>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass-card p-4 text-center">
              <Mail className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium">Email</p>
              <p className="text-xs text-text-muted">hello@patrolproof.com</p>
            </div>
            <div className="glass-card p-4 text-center">
              <Phone className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium">Phone</p>
              <p className="text-xs text-text-muted">+1 (555) 123-4567</p>
            </div>
            <div className="glass-card p-4 text-center">
              <MessageSquare className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium">Support</p>
              <p className="text-xs text-text-muted">24/7 Live Chat</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
