

/**
 * Player Modal Component with modern React patterns
 */
const PlayerModal = ({
  isOpen,
  mode,
  player,
  onSave,
  onCancel,
  onChange
}) => {
  const [formData, setFormData] = useState(player);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when modal opens or player changes
  React.useEffect(() => {
    if (isOpen) {
      setFormData(player);
      setErrors({});
      setIsSubmitting(false);
    }
  }, [isOpen, player]);

  // Validation rules
  const validationRules = React.useMemo(() => ({
    name: {
      required: true,
      minLength: 1,
      maxLength: 50,
      message: 'Name must be between 1 and 50 characters'
    },
    hqLevel: {
      required: true,
      min: 1,
      max: 30,
      message: 'HQ level must be between 1 and 30'
    },
    role: {
      required: true,
      message: 'Role is required'
    }
  }), []);

  // Validate form data
  const validateForm = React.useCallback((data) => {
    const newErrors = {};

    // Name validation
    if (!data.name || data.name.trim() === '') {
      newErrors.name = 'Name is required';
    } else if (data.name.length < validationRules.name.minLength || data.name.length > validationRules.name.maxLength) {
      newErrors.name = validationRules.name.message;
    }

    // HQ Level validation
    const hqLevel = parseInt(data.hqLevel);
    if (isNaN(hqLevel) || hqLevel < validationRules.hqLevel.min || hqLevel > validationRules.hqLevel.max) {
      newErrors.hqLevel = validationRules.hqLevel.message;
    }

    // Role validation
    if (!data.role) {
      newErrors.role = validationRules.role.message;
    }

    return newErrors;
  }, [validationRules]);

  // Handle input changes
  const handleInputChange = React.useCallback((field, value) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);

    // Update parent component
    onChange?.(newFormData);

    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  }, [formData, errors, onChange]);

  // Handle form submission
  const handleSubmit = React.useCallback(async (e) => {
    e.preventDefault();

    const newErrors = validateForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      try {
        await onSave?.(formData);
      } catch (error) {
        console.error('Error saving player:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  }, [formData, validateForm, onSave]);

  // Handle cancel
  const handleCancel = React.useCallback(() => {
    setFormData(player);
    setErrors({});
    onCancel?.();
  }, [player, onCancel]);

  // Handle escape key
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleCancel();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, handleCancel]);

  // Prevent body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const modalTitle = mode === 'add' ? 'Add New Player' : 'Edit Player';
  const submitButtonText = isSubmitting ? 'Saving...' : (mode === 'add' ? 'Add Player' : 'Save Changes');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleCancel}
      />

      {/* Modal */}
      <div className="relative bg-gray-800/95 backdrop-blur-sm border border-red-500/30 rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-orange-400">{modalTitle}</h2>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <span className="text-2xl">×</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              Player Name *
            </label>
            <input
              id="name"
              type="text"
              value={formData.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`w-full px-4 py-3 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all ${errors.name ? 'border-red-500' : 'border-gray-600'
                }`}
              placeholder="Enter player name"
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-400">{errors.name}</p>
            )}
          </div>

          {/* HQ Level Field */}
          <div>
            <label htmlFor="hqLevel" className="block text-sm font-medium text-gray-300 mb-2">
              HQ Level *
            </label>
            <input
              id="hqLevel"
              type="number"
              min="1"
              max="30"
              value={formData.hqLevel || ''}
              onChange={(e) => handleInputChange('hqLevel', e.target.value)}
              className={`w-full px-4 py-3 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all ${errors.hqLevel ? 'border-red-500' : 'border-gray-600'
                }`}
              placeholder="Enter HQ level (1-30)"
              disabled={isSubmitting}
            />
            {errors.hqLevel && (
              <p className="mt-1 text-sm text-red-400">{errors.hqLevel}</p>
            )}
          </div>

          {/* Role Field */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-2">
              Role *
            </label>
            <select
              id="role"
              value={formData.role || ''}
              onChange={(e) => handleInputChange('role', e.target.value)}
              className={`w-full px-4 py-3 bg-gray-700/50 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all ${errors.role ? 'border-red-500' : 'border-gray-600'
                }`}
              disabled={isSubmitting}
            >
              <option value="">Select a role</option>
              {Object.entries(window.ALLIANCE_CONFIG.ROLES).map(([key, role]) => (
                <option key={key} value={key} className="bg-gray-700 text-white">
                  {role.name}
                </option>
              ))}
            </select>
            {errors.role && (
              <p className="mt-1 text-sm text-red-400">{errors.role}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 px-4 py-3 bg-gray-600 hover:bg-gray-500 text-white rounded-lg font-semibold transition-all"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {submitButtonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Make available globally
window.PlayerModal = PlayerModal; 