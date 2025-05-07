'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { indianStates, stateDistricts } from '../utils/indianStates';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    state: '',
    district: ''
  });
  const [availableDistricts, setAvailableDistricts] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Update districts when state changes
  useEffect(() => {
    if (formData.state && stateDistricts[formData.state]) {
      setAvailableDistricts(stateDistricts[formData.state]);
    } else {
      setAvailableDistricts([]);
    }
    
    // Reset district when state changes
    setFormData(prev => ({
      ...prev,
      district: ''
    }));
  }, [formData.state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword || 
        !formData.phone || !formData.state || !formData.district) {
      setError('Please fill in all fields');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    if (!/^\d{10}$/.test(formData.phone)) {
      setError('Phone number must be 10 digits');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    // For demonstration, we'll just simulate a successful registration after a delay
    // In a real app, you would make an API call to register the user
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage('Registration successful! Redirecting to login...');
      
      // Redirect to login page after a short delay
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Create an Account</h1>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {successMessage && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
            {successMessage}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="input-field"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                className="input-field"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="input-field"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="input-field"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="input-field"
                placeholder="Enter your 10-digit phone number"
                value={formData.phone}
                onChange={handleChange}
                pattern="[0-9]{10}"
                required
              />
            </div>
            
            <div>
              <label htmlFor="state" className="block text-gray-700 mb-2">State</label>
              <select
                id="state"
                name="state"
                className="input-field"
                value={formData.state}
                onChange={handleChange}
                required
              >
                <option value="">Select State</option>
                {indianStates.map((state, index) => (
                  <option key={index} value={state}>{state}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="district" className="block text-gray-700 mb-2">District</label>
              <select
                id="district"
                name="district"
                className="input-field"
                value={formData.district}
                onChange={handleChange}
                required
                disabled={!formData.state}
              >
                <option value="">Select District</option>
                {availableDistricts.map((district, index) => (
                  <option key={index} value={district}>{district}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              required
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              I agree to the <a href="/terms" className="text-blue-600 hover:text-blue-500">Terms and Conditions</a> and <a href="/privacy" className="text-blue-600 hover:text-blue-500">Privacy Policy</a>
            </label>
          </div>
          
          <button
            type="submit"
            className="btn-primary w-full py-3"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 hover:text-blue-500">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 