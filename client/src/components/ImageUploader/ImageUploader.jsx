import { useState, useRef } from 'react';
import { UploadCloud, Loader2, Check, AlertCircle, Image as ImageIcon } from 'lucide-react';
import api from '../../services/api';

const ImageUploader = ({ value, onChange, label = 'Upload Image' }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size (max 8MB)
    if (file.size > 8 * 1024 * 1024) {
      setError('Image file is too large (max 8MB allowed).');
      return;
    }

    setUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await api.post('/v1/admin/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (res.data?.success && res.data?.url) {
        onChange(res.data.url);
      } else {
        setError(res.data?.message || 'Upload failed.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div style={{ marginTop: '0.4rem', marginBottom: '0.6rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          style={{ display: 'none' }}
        />

        <button
          type="button"
          disabled={uploading}
          onClick={() => fileInputRef.current?.click()}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.45rem 0.85rem',
            borderRadius: '6px',
            background: 'rgba(27, 77, 62, 0.08)',
            border: '1px solid rgba(27, 77, 62, 0.25)',
            color: 'var(--nid-forest, #1B4D3E)',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: uploading ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s'
          }}
        >
          {uploading ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              <span>Uploading to Cloudinary...</span>
            </>
          ) : (
            <>
              <UploadCloud size={14} />
              <span>{label}</span>
            </>
          )}
        </button>

        {value && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <img
              src={value}
              alt="Preview"
              style={{
                width: '36px',
                height: '36px',
                objectFit: 'cover',
                borderRadius: '4px',
                border: '1px solid #ddd'
              }}
            />
            <span style={{ fontSize: '0.75rem', color: '#166534', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
              <Check size={12} /> Image Ready
            </span>
          </div>
        )}
      </div>

      {error && (
        <div style={{ marginTop: '0.3rem', fontSize: '0.75rem', color: '#dc2626', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <AlertCircle size={12} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
