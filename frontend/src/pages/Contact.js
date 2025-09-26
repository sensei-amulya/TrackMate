import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Reset form
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);

    // You can add actual form submission logic here
    alert("Message sent successfully!");
  };

  return (
    <div
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat min-h-screen"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFyayUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D')",
      }}
    >
      <div className="absolute inset-0 bg-black/70"></div>

      {/* CSS-based background charts */}
      <div className="absolute inset-0 opacity-10">
        {/* Pie Chart 1 */}
        <div className="absolute top-20 left-10 w-32 h-32">
          <div className="relative w-full h-full">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(#3B82F6 0deg 234deg, #10B981 234deg 324deg, #F59E0B 324deg 360deg)`,
              }}
            ></div>
            <div className="absolute inset-4 bg-gray-900 rounded-full"></div>
          </div>
        </div>

        {/* Bar Chart 1 */}
        <div className="absolute top-40 right-20 flex items-end space-x-2 opacity-20">
          <div className="w-6 h-16 bg-blue-600 rounded-t"></div>
          <div className="w-6 h-24 bg-blue-600 rounded-t"></div>
          <div className="w-6 h-32 bg-blue-600 rounded-t"></div>
          <div className="w-6 h-20 bg-blue-600 rounded-t"></div>
        </div>

        {/* Pie Chart 2 */}
        <div className="absolute bottom-32 left-20 w-36 h-36">
          <div className="relative w-full h-full">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(#8B5CF6 0deg 144deg, #06B6D4 144deg 270deg, #F97316 270deg 360deg)`,
              }}
            ></div>
            <div className="absolute inset-6 bg-gray-900 rounded-full"></div>
          </div>
        </div>

        {/* Bar Chart 2 */}
        <div className="absolute bottom-20 right-32 flex items-end space-x-2 opacity-15">
          <div className="w-4 h-12 bg-green-500 rounded-t"></div>
          <div className="w-4 h-18 bg-green-500 rounded-t"></div>
          <div className="w-4 h-28 bg-green-500 rounded-t"></div>
          <div className="w-4 h-24 bg-green-500 rounded-t"></div>
          <div className="w-4 h-32 bg-green-500 rounded-t"></div>
        </div>

        {/* Additional decorative elements */}
        <div className="absolute top-1/3 right-10 w-24 h-24 border-2 border-purple-500 rounded-full opacity-20"></div>
        <div className="absolute bottom-1/3 left-1/4 w-16 h-16 border-2 border-blue-400 rounded-lg rotate-45 opacity-15"></div>
      </div>

      {/* Gradient overlays for depth */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-gray-900/50"></div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col lg:flex-row max-w-6xl mx-auto px-6 py-20 gap-12">
        {/* Left side - Contact Information */}
        <div className="lg:w-1/2 space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Get In <span className="text-blue-400">Touch</span>
            </h2>
            <p className="text-gray-200 text-lg leading-relaxed mb-8">
              Have questions about TrackMate or need support? We'd love to hear
              from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          {/* Contact Info Cards */}
          <div className="space-y-6">
            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-gray-600 hover:border-blue-500/50 transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">Email Us</h3>
                  <p className="text-gray-400">support@trackmate.com</p>
                </div>
              </div>
            </div>

            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-gray-600 hover:border-green-500/50 transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">Call Us</h3>
                  <p className="text-gray-400">+91 (120) 123-4567</p>
                </div>
              </div>
            </div>

            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-gray-600 hover:border-purple-500/50 transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">Visit Us</h3>
                  <p className="text-gray-400">
                    123 Tech Street, Innovation City
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Social or additional info */}
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-xl p-6 border border-gray-600">
            <div className="flex items-center space-x-3 mb-3">
              <MessageCircle className="w-6 h-6 text-blue-400" />
              <h3 className="text-white font-semibold text-lg">
                Quick Response
              </h3>
            </div>
            <p className="text-gray-300 text-sm">
              We typically respond to all inquiries within 24 hours. For urgent
              matters, please call us directly.
            </p>
          </div>
        </div>

        {/* Right side - Contact Form */}
        <div className="lg:w-1/2">
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-600 shadow-2xl">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">
                Send us a Message
              </h3>
              <p className="text-gray-400">
                Fill out the form below and we'll get back to you soon.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-white font-medium mb-2"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300 hover:border-white/30"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-white font-medium mb-2"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  required
                  className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300 hover:border-white/30"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-white font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us how we can help you..."
                  required
                  className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300 hover:border-white/30 resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
