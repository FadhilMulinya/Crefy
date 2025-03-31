"use client";
import { useState } from 'react';
import { CheckCircle, Clock, Plus, X, Edit2, Save, Trash2 } from 'lucide-react';

interface CertificateSignersProps {
    signers?: any[];
    onChange?: any;
    maxSigners?: number;
    readOnly?: boolean;
}

export default function CertificateSigners ({ signers = [], onChange, maxSigners = 10, readOnly }: CertificateSignersProps) {
  const [editingIndex, setEditingIndex] = useState(null);
  const [newSignerAddress, setNewSignerAddress] = useState('');
  const [newSignerRole, setNewSignerRole] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [editRole, setEditRole] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // Calculate derived values
  const allSignersCompleted = signers.every(signer => signer.status === 'completed');
  const pendingSigners = signers.filter(signer => signer.status === 'pending').length;
  const canAddSigner = signers.length < maxSigners;

  // Handle adding a new signer
  const handleAddSigner = () => {
    if (!canAddSigner || !newSignerAddress || !newSignerRole) return;
    
    const newSigner = {
      address: newSignerAddress,
      role: newSignerRole,
      status: 'pending'
    };
    
    onChange([...signers, newSigner]);
    setNewSignerAddress('');
    setNewSignerRole('');
    setShowAddForm(false);
  };

  // Handle deleting a signer
  const handleDeleteSigner = (index) => {
    const updatedSigners = [...signers];
    updatedSigners.splice(index, 1);
    onChange(updatedSigners);
  };

  // Start editing a signer
  const startEditing = (index) => {
    setEditingIndex(index);
    setEditAddress(signers[index].address);
    setEditRole(signers[index].role);
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingIndex(null);
    setEditAddress('');
    setEditRole('');
  };

  // Save edited signer
  const saveEditing = () => {
    if (!editAddress || !editRole) return;
    
    const updatedSigners = [...signers];
    updatedSigners[editingIndex] = {
      ...updatedSigners[editingIndex],
      address: editAddress,
      role: editRole
    };
    
    onChange(updatedSigners);
    setEditingIndex(null);
  };

  // Toggle signer status
  const toggleSignerStatus = (index) => {
    const updatedSigners = [...signers];
    updatedSigners[index].status = updatedSigners[index].status === 'completed' ? 'pending' : 'completed';
    onChange(updatedSigners);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-white text-lg font-bold mb-4">CERTIFICATE SIGNERS</h2>
      
      {/* Signers list */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <label className="block text-white">Signers ({signers.length}/{maxSigners})</label>
          {!readOnly && canAddSigner && !showAddForm && (
            <button 
              onClick={() => setShowAddForm(true)}
              className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm flex items-center"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Signer
            </button>
          )}
        </div>

        {/* Signers cards */}
        {signers.length > 0 ? (
          <div className="space-y-3">
            {signers.map((signer, index) => (
              <div key={index} className={`p-3 border rounded-md ${signer.status === 'completed' ? 'border-green-500/30 bg-gray-700/70' : 'border-yellow-500/30 bg-gray-700'}`}>
                {editingIndex === index ? (
                  // Edit mode
                  <div className="space-y-2">
                    <div>
                      <label className="text-gray-300 text-sm">Address</label>
                      <input
                        type="text"
                        className="w-full p-2 bg-gray-900 border border-gray-600 rounded-md text-white"
                        value={editAddress}
                        onChange={(e) => setEditAddress(e.target.value)}
                        placeholder="0x..."
                      />
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm">Role</label>
                      <input
                        type="text"
                        className="w-full p-2 bg-gray-900 border border-gray-600 rounded-md text-white"
                        value={editRole}
                        onChange={(e) => setEditRole(e.target.value)}
                        placeholder="Dean, Professor, etc."
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button 
                        onClick={cancelEditing}
                        className="p-1 text-gray-400 hover:text-gray-300"
                      >
                        <X className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={saveEditing}
                        className="p-1 text-blue-400 hover:text-blue-300"
                      >
                        <Save className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ) : (
                  // View mode
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${signer.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                        <div>
                          <div className="text-white font-medium">{truncateAddress(signer.address)}</div>
                          <div className="text-gray-400 text-sm">{signer.role}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        {!readOnly && (
                          <>
                            <button 
                              onClick={() => toggleSignerStatus(index)} 
                              className={`p-1 mr-1 ${signer.status === 'completed' ? 'text-green-500 hover:text-green-400' : 'text-yellow-500 hover:text-yellow-400'}`}
                              title={signer.status === 'completed' ? 'Mark as pending' : 'Mark as completed'}
                            >
                              {signer.status === 'completed' ? (
                                <CheckCircle className="w-5 h-5" />
                              ) : (
                                <Clock className="w-5 h-5" />
                              )}
                            </button>
                            <button 
                              onClick={() => startEditing(index)}
                              className="p-1 text-blue-400 hover:text-blue-300 mr-1"
                            >
                              <Edit2 className="w-5 h-5" />
                            </button>
                            <button 
                              onClick={() => handleDeleteSigner(index)}
                              className="p-1 text-red-400 hover:text-red-300"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-4 border border-dashed border-gray-600 rounded-md">
            <p className="text-gray-400">No signers added yet</p>
          </div>
        )}
      </div>

      {/* Add signer form */}
      {!readOnly && showAddForm && (
        <div className="mb-4 p-4 border border-dashed border-blue-500/30 rounded-md bg-gray-700/50">
          <h3 className="text-white text-md mb-3">Add New Signer</h3>
          <div className="space-y-3">
            <div>
              <label className="text-gray-300 text-sm">Wallet Address</label>
              <input
                type="text"
                className="w-full p-2 bg-gray-900 border border-gray-600 rounded-md text-white"
                value={newSignerAddress}
                onChange={(e) => setNewSignerAddress(e.target.value)}
                placeholder="0x..."
              />
            </div>
            <div>
              <label className="text-gray-300 text-sm">Role</label>
              <input
                type="text"
                className="w-full p-2 bg-gray-900 border border-gray-600 rounded-md text-white"
                value={newSignerRole}
                onChange={(e) => setNewSignerRole(e.target.value)}
                placeholder="Dean, Professor, Department Chair, etc."
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button 
                onClick={() => setShowAddForm(false)}
                className="px-3 py-1 border border-gray-500 text-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddSigner}
                disabled={!newSignerAddress || !newSignerRole}
                className={`px-3 py-1 bg-blue-500 text-white rounded-md ${(!newSignerAddress || !newSignerRole) ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Add Signer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Status summary */}
      {signers.length > 0 && (
        <div className="p-3 bg-gray-700 border border-gray-600 rounded-md">
          {allSignersCompleted ? (
            <p className="text-green-500 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              All signers have completed
            </p>
          ) : (
            <p className="text-yellow-500 flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Waiting for {pendingSigners} of {signers.length} signers to complete
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// Utility function to truncate address
function truncateAddress(address) {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}