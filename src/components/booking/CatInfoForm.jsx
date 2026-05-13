import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Cat } from 'lucide-react';

const schema = z.object({
  catName: z
    .string()
    .min(1, 'Please enter your cat\'s name')
    .max(50, 'Name must be 50 characters or less')
    .regex(/^[a-zA-Z0-9\s\-'.]+$/, 'Only letters, numbers, spaces, and - \' . are allowed'),
});

export default function CatInfoForm({ defaultValue = '', onSubmit }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { catName: defaultValue },
    mode: 'onChange',
  });

  const catName = watch('catName');

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ fontFamily: 'Nunito, sans-serif' }}>
      <div className="mb-5">
        <label
          htmlFor="catName"
          className="flex items-center gap-2 text-sm font-bold mb-2"
          style={{ color: '#3D2314' }}
        >
          <Cat size={16} color="#C4603A" />
          Your Cat's Name
        </label>

        <div className="relative">
          <input
            id="catName"
            type="text"
            placeholder="e.g. Luna, Mochi, Simba…"
            autoComplete="off"
            className="w-full px-4 py-3 rounded-xl text-sm font-semibold outline-none transition-all duration-200"
            style={{
              backgroundColor: '#fff',
              border: `2px solid ${errors.catName ? '#F5C6C0' : catName ? '#C4603A' : '#EAD9C5'}`,
              color: '#3D2314',
              fontFamily: 'Nunito, sans-serif',
            }}
            {...register('catName')}
          />
          {/* Character count */}
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs"
            style={{ color: '#D9C4A8' }}
          >
            {catName?.length || 0}/50
          </span>
        </div>

        {errors.catName && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1.5 text-xs font-semibold"
            style={{ color: '#C4603A' }}
          >
            {errors.catName.message}
          </motion.p>
        )}
      </div>

      <motion.button
        type="submit"
        disabled={!isValid}
        whileTap={isValid ? { scale: 0.97 } : {}}
        className="w-full py-3.5 rounded-full text-sm font-extrabold text-white transition-all duration-200"
        style={{
          backgroundColor: isValid ? '#C4603A' : '#D9C4A8',
          cursor: isValid ? 'pointer' : 'not-allowed',
          boxShadow: isValid ? '0 4px 16px rgba(196,96,58,0.30)' : 'none',
        }}
      >
        Confirm Booking →
      </motion.button>
    </form>
  );
}
