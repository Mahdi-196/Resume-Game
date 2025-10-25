import { useEffect } from 'react';
import { X } from 'lucide-react';

interface BoardOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BoardOverlay = ({ isOpen, onClose }: BoardOverlayProps) => {
  // Handle ESC key to close overlay
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 pointer-events-none">

      {/* Close button */}
      <button
        onClick={onClose}
        className="fixed top-6 right-6 z-50 w-10 h-10 bg-red-600 rounded-full shadow-lg hover:bg-red-700 transition-all hover:scale-110 flex items-center justify-center pointer-events-auto animate-fade-in"
        style={{
          boxShadow: '0 4px 6px rgba(0,0,0,0.5)',
          animation: 'fadeIn 0.4s ease-in forwards',
          animationDelay: '0.2s',
          opacity: 0
        }}
      >
        <X className="h-5 w-5 text-white" />
      </button>

      {/* Instructions */}
      <div className="fixed top-6 left-6 z-50 bg-black/70 text-detective-glow px-3 py-2 rounded border border-detective-brass pointer-events-none"
           style={{
             animation: 'fadeIn 0.4s ease-in forwards',
             animationDelay: '0.2s',
             opacity: 0
           }}>
        <p className="text-xs font-mono">Press ESC or click ✕ to exit</p>
      </div>

      {/* Content Container - Aligned with board */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        {/* Board-aligned content area */}
        <div className="relative w-[85vw] max-w-[1400px] h-[75vh] overflow-y-auto pointer-events-auto"
             style={{
               scrollbarWidth: 'thin',
               scrollbarColor: '#D4AF37 rgba(0,0,0,0.3)',
               animation: 'fadeIn 0.5s ease-in forwards',
               animationDelay: '0.3s',
               opacity: 0
             }}>

          {/* Evidence Cards Grid */}
          <div className="grid grid-cols-12 gap-3 p-4">
            <style>{`
              @keyframes fadeIn {
                from {
                  opacity: 0;
                  transform: translateY(10px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
            `}</style>

            {/* Row 1: About Me & Education */}
            {/* About Me Card */}
            <div className="col-span-12 md:col-span-6 relative">
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-red-600 rounded-full shadow-lg z-10"
                   style={{ boxShadow: '0 2px 8px rgba(220,0,0,0.8)' }}></div>
              <div className="p-4 shadow-2xl transform hover:scale-105 transition-transform border-2"
                   style={{
                     backgroundColor: '#D2B48C',
                     borderColor: '#654321',
                     boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
                     backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 31px, rgba(101,67,33,0.12) 31px, rgba(101,67,33,0.12) 32px)'
                   }}>
                <div className="flex items-center gap-2 mb-2 border-b-2 pb-1" style={{ borderColor: '#654321' }}>
                  <div className="bg-red-600 text-white px-2 py-1 text-xs font-bold">CASE FILE #001</div>
                  <h3 className="text-base font-bold font-mono" style={{ color: '#654321' }}>ABOUT ME</h3>
                </div>
                <div className="space-y-2 font-mono text-xs" style={{ color: '#3d2817' }}>
                  <p className="leading-relaxed">
                    Full-stack developer passionate about creating immersive web experiences.
                    Specializing in modern web technologies and 3D graphics.
                  </p>
                  <div className="pt-2 border-t" style={{ borderColor: '#654321' }}>
                    <p><strong>Name:</strong> Mahdi Ghaleb</p>
                    <p><strong>Email:</strong> mahdi@example.com</p>
                    <p><strong>Location:</strong> Remote</p>
                    <p><strong>LinkedIn:</strong> /in/mahdighaleb</p>
                    <p><strong>GitHub:</strong> /mahdighaleb</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Education Card */}
            <div className="col-span-12 md:col-span-6 relative">
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-red-600 rounded-full shadow-lg z-10"
                   style={{ boxShadow: '0 2px 8px rgba(220,0,0,0.8)' }}></div>
              <div className="p-4 shadow-2xl transform hover:scale-105 transition-transform border-2"
                   style={{
                     backgroundColor: '#D2B48C',
                     borderColor: '#654321',
                     boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
                     backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 31px, rgba(101,67,33,0.12) 31px, rgba(101,67,33,0.12) 32px)'
                   }}>
                <div className="flex items-center gap-2 mb-2 border-b-2 pb-1" style={{ borderColor: '#654321' }}>
                  <div className="bg-red-600 text-white px-2 py-1 text-xs font-bold">CASE FILE #002</div>
                  <h3 className="text-base font-bold font-mono" style={{ color: '#654321' }}>EDUCATION</h3>
                </div>
                <div className="space-y-3 font-mono text-xs" style={{ color: '#3d2817' }}>
                  <div>
                    <h4 className="font-bold" style={{ color: '#654321' }}>Bachelor of Computer Science</h4>
                    <p className="text-xs opacity-80">University Name • 2018-2022</p>
                    <p className="mt-1">Focus: Software Engineering, Web Development</p>
                  </div>
                  <div className="pt-2 border-t" style={{ borderColor: '#654321' }}>
                    <h4 className="font-bold mb-1" style={{ color: '#654321' }}>Certifications & Learning</h4>
                    <ul className="space-y-0.5">
                      <li>• AWS Certified Developer</li>
                      <li>• Self-taught in Three.js & 3D Graphics</li>
                      <li>• Continuous learner via online platforms</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills Card */}
            <div className="col-span-12 relative">
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-red-600 rounded-full shadow-lg z-10"
                   style={{ boxShadow: '0 2px 8px rgba(220,0,0,0.8)' }}></div>
              <div className="p-4 shadow-2xl transform hover:scale-105 transition-transform border-2"
                   style={{
                     backgroundColor: '#FFEB3B',
                     borderColor: '#654321',
                     boxShadow: '0 8px 32px rgba(0,0,0,0.6)'
                   }}>
                <div className="flex items-center gap-2 mb-3 border-b-2 pb-1" style={{ borderColor: '#654321' }}>
                  <div className="bg-black text-yellow-400 px-2 py-1 text-xs font-bold">CASE FILE #003</div>
                  <h3 className="text-base font-bold font-mono" style={{ color: '#654321' }}>TECHNICAL SKILLS</h3>
                </div>
                <div className="grid grid-cols-3 gap-3 text-xs font-mono">
                  <div>
                    <h4 className="font-bold mb-1" style={{ color: '#654321' }}>FRONTEND</h4>
                    <ul className="space-y-0.5" style={{ color: '#3d2817' }}>
                      <li>• React/Next.js</li>
                      <li>• TypeScript</li>
                      <li>• Three.js/R3F</li>
                      <li>• Tailwind CSS</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1" style={{ color: '#654321' }}>BACKEND</h4>
                    <ul className="space-y-0.5" style={{ color: '#3d2817' }}>
                      <li>• Node.js</li>
                      <li>• Python</li>
                      <li>• PostgreSQL</li>
                      <li>• MongoDB</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1" style={{ color: '#654321' }}>CLOUD/DEVOPS</h4>
                    <ul className="space-y-0.5" style={{ color: '#3d2817' }}>
                      <li>• AWS</li>
                      <li>• Docker</li>
                      <li>• CI/CD</li>
                      <li>• Terraform</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2: Projects Header */}
            <div className="col-span-12 relative">
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-red-600 rounded-full shadow-lg z-10"
                   style={{ boxShadow: '0 2px 8px rgba(220,0,0,0.8)' }}></div>
              <div className="p-3 shadow-2xl border-2 text-center"
                   style={{
                     backgroundColor: '#1a0d00',
                     borderColor: '#654321',
                     boxShadow: '0 8px 32px rgba(0,0,0,0.6)'
                   }}>
                <div className="flex items-center justify-center gap-2">
                  <div className="bg-red-600 text-white px-2 py-1 text-xs font-bold">CASE FILE #004</div>
                  <h3 className="text-lg font-bold font-mono" style={{ color: '#FFD700' }}>PROJECTS</h3>
                </div>
              </div>
            </div>

            {/* AWS Architecture Project */}
            <div className="col-span-12 relative">
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-red-600 rounded-full shadow-lg z-10"
                   style={{ boxShadow: '0 2px 8px rgba(220,0,0,0.8)' }}></div>
              <div className="p-4 shadow-2xl transform hover:scale-[1.01] transition-transform border-2"
                   style={{
                     backgroundColor: '#D2B48C',
                     borderColor: '#654321',
                     boxShadow: '0 8px 32px rgba(0,0,0,0.6)'
                   }}>
                <h3 className="text-base font-bold mb-2 border-b-2 pb-1 font-mono" style={{ color: '#654321', borderColor: '#654321' }}>
                  ☁️ AWS SERVERLESS ARCHITECTURE
                </h3>
                <div className="p-2 border-2 rounded" style={{ backgroundColor: '#FFF', borderColor: '#654321' }}>
                  {/* Replace with your actual AWS diagram */}
                  <div className="aspect-video bg-slate-100 flex items-center justify-center">
                    <div className="text-center text-slate-500">
                      <p className="text-sm mb-1">📊 AWS Architecture</p>
                      <p className="text-xs">Add: &lt;img src="/images/aws-diagram.png" /&gt;</p>
                    </div>
                  </div>
                </div>
                <p className="mt-2 text-xs italic font-mono" style={{ color: '#3d2817' }}>
                  "Serverless: Lambda + API Gateway + DynamoDB + CloudFront"
                </p>
              </div>
            </div>

            {/* Row 3: Portfolio Projects */}
            {/* Project 1 */}
            <div className="col-span-12 md:col-span-4 relative">
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-red-600 rounded-full shadow-lg z-10"
                   style={{ boxShadow: '0 2px 8px rgba(220,0,0,0.8)' }}></div>
              <div className="p-3 shadow-2xl transform hover:scale-105 transition-transform border-2"
                   style={{
                     backgroundColor: '#D2B48C',
                     borderColor: '#654321',
                     boxShadow: '0 8px 32px rgba(0,0,0,0.6)'
                   }}>
                <div className="p-2 border-2 mb-2 rounded" style={{ backgroundColor: '#FFF', borderColor: '#654321' }}>
                  <div className="aspect-video bg-slate-100 flex items-center justify-center text-slate-400 text-xs">
                    Screenshot
                  </div>
                </div>
                <h4 className="font-bold mb-1 font-mono text-sm" style={{ color: '#654321' }}>
                  E-COMMERCE PLATFORM
                </h4>
                <p className="text-xs mb-2 font-mono" style={{ color: '#3d2817' }}>
                  Full-stack marketplace with Stripe payments, real-time inventory
                </p>
                <div className="flex flex-wrap gap-1">
                  <span className="text-xs px-2 py-0.5 rounded font-mono" style={{ backgroundColor: '#8B7355', color: '#FFF' }}>React</span>
                  <span className="text-xs px-2 py-0.5 rounded font-mono" style={{ backgroundColor: '#8B7355', color: '#FFF' }}>Node</span>
                  <span className="text-xs px-2 py-0.5 rounded font-mono" style={{ backgroundColor: '#8B7355', color: '#FFF' }}>AWS</span>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="col-span-12 md:col-span-4 relative">
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-red-600 rounded-full shadow-lg z-10"
                   style={{ boxShadow: '0 2px 8px rgba(220,0,0,0.8)' }}></div>
              <div className="p-3 shadow-2xl transform hover:scale-105 transition-transform border-2"
                   style={{
                     backgroundColor: '#D2B48C',
                     borderColor: '#654321',
                     boxShadow: '0 8px 32px rgba(0,0,0,0.6)'
                   }}>
                <div className="p-2 border-2 mb-2 rounded" style={{ backgroundColor: '#FFF', borderColor: '#654321' }}>
                  <div className="aspect-video bg-slate-100 flex items-center justify-center text-slate-400 text-xs">
                    Screenshot
                  </div>
                </div>
                <h4 className="font-bold mb-1 font-mono text-sm" style={{ color: '#654321' }}>
                  REAL-TIME CHAT APP
                </h4>
                <p className="text-xs mb-2 font-mono" style={{ color: '#3d2817' }}>
                  WebSocket chat with voice/video, file sharing, E2E encryption
                </p>
                <div className="flex flex-wrap gap-1">
                  <span className="text-xs px-2 py-0.5 rounded font-mono" style={{ backgroundColor: '#8B7355', color: '#FFF' }}>Socket.io</span>
                  <span className="text-xs px-2 py-0.5 rounded font-mono" style={{ backgroundColor: '#8B7355', color: '#FFF' }}>WebRTC</span>
                  <span className="text-xs px-2 py-0.5 rounded font-mono" style={{ backgroundColor: '#8B7355', color: '#FFF' }}>Redis</span>
                </div>
              </div>
            </div>

            {/* Project 3 */}
            <div className="col-span-12 md:col-span-4 relative">
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-red-600 rounded-full shadow-lg z-10"
                   style={{ boxShadow: '0 2px 8px rgba(220,0,0,0.8)' }}></div>
              <div className="p-3 shadow-2xl transform hover:scale-105 transition-transform border-2"
                   style={{
                     backgroundColor: '#D2B48C',
                     borderColor: '#654321',
                     boxShadow: '0 8px 32px rgba(0,0,0,0.6)'
                   }}>
                <div className="p-2 border-2 mb-2 rounded" style={{ backgroundColor: '#FFF', borderColor: '#654321' }}>
                  <div className="aspect-video bg-slate-100 flex items-center justify-center text-slate-400 text-xs">
                    Screenshot
                  </div>
                </div>
                <h4 className="font-bold mb-1 font-mono text-sm" style={{ color: '#654321' }}>
                  ANALYTICS DASHBOARD
                </h4>
                <p className="text-xs mb-2 font-mono" style={{ color: '#3d2817' }}>
                  Real-time data viz with D3.js, 1TB+ daily processing
                </p>
                <div className="flex flex-wrap gap-1">
                  <span className="text-xs px-2 py-0.5 rounded font-mono" style={{ backgroundColor: '#8B7355', color: '#FFF' }}>D3.js</span>
                  <span className="text-xs px-2 py-0.5 rounded font-mono" style={{ backgroundColor: '#8B7355', color: '#FFF' }}>GraphQL</span>
                  <span className="text-xs px-2 py-0.5 rounded font-mono" style={{ backgroundColor: '#8B7355', color: '#FFF' }}>Kafka</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
