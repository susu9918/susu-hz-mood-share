'use client'

export default function CatDogBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <svg 
        width="100%" 
        height="100%" 
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0"
      >
        <defs>
          {/* 定义小猫图案 - 更细致 */}
          <pattern id="catPattern" x="0" y="0" width="180" height="180" patternUnits="userSpaceOnUse">
            {/* 小猫 */}
            <g transform="translate(30, 30) rotate(15)" opacity="0.25">
              {/* 头部 */}
              <circle cx="40" cy="40" r="30" fill="none" stroke="#ff6b9d" strokeWidth="2.5"/>
              
              {/* 耳朵 - 更立体 */}
              <path d="M20 25 L10 5 L25 20 Z" fill="none" stroke="#ff6b9d" strokeWidth="2.5"/>
              <path d="M60 25 L70 5 L55 20 Z" fill="none" stroke="#ff6b9d" strokeWidth="2.5"/>
              {/* 耳朵内部 */}
              <path d="M20 20 L15 10 L22 18 Z" fill="#ffb3d9" opacity="0.5"/>
              <path d="M60 20 L65 10 L58 18 Z" fill="#ffb3d9" opacity="0.5"/>
              
              {/* 眼睛 - 更有神 */}
              <ellipse cx="28" cy="35" rx="5" ry="6" fill="#ff6b9d"/>
              <ellipse cx="52" cy="35" rx="5" ry="6" fill="#ff6b9d"/>
              <ellipse cx="29" cy="34" rx="2" ry="2" fill="white"/>
              <ellipse cx="53" cy="34" rx="2" ry="2" fill="white"/>
              
              {/* 鼻子 */}
              <path d="M40 48 L36 52 L44 52 Z" fill="#ff6b9d"/>
              
              {/* 嘴巴 - 更可爱 */}
              <path d="M40 52 Q30 58 20 52" fill="none" stroke="#ff6b9d" strokeWidth="2"/>
              <path d="M40 52 Q50 58 60 52" fill="none" stroke="#ff6b9d" strokeWidth="2"/>
              
              {/* 胡须 - 更多更细 */}
              <line x1="8" y1="38" x2="25" y2="40" stroke="#ff6b9d" strokeWidth="1.5"/>
              <line x1="8" y1="45" x2="25" y2="45" stroke="#ff6b9d" strokeWidth="1.5"/>
              <line x1="55" y1="40" x2="72" y2="38" stroke="#ff6b9d" strokeWidth="1.5"/>
              <line x1="55" y1="45" x2="72" y2="45" stroke="#ff6b9d" strokeWidth="1.5"/>
              
              {/* 身体 */}
              <ellipse cx="40" cy="85" rx="25" ry="20" fill="none" stroke="#ff6b9d" strokeWidth="2.5"/>
              
              {/* 肚子 */}
              <ellipse cx="40" cy="88" rx="18" ry="15" fill="#ffb3d9" opacity="0.3"/>
              
              {/* 尾巴 - 更弯曲 */}
              <path d="M60 85 Q80 75 75 95 Q70 100 65 98" fill="none" stroke="#ff6b9d" strokeWidth="2.5"/>
              
              {/* 爪子 */}
              <ellipse cx="25" cy="100" rx="4" ry="6" fill="none" stroke="#ff6b9d" strokeWidth="2"/>
              <ellipse cx="35" cy="102" rx="4" ry="6" fill="none" stroke="#ff6b9d" strokeWidth="2"/>
              <ellipse cx="45" cy="102" rx="4" ry="6" fill="none" stroke="#ff6b9d" strokeWidth="2"/>
              <ellipse cx="55" cy="100" rx="4" ry="6" fill="none" stroke="#ff6b9d" strokeWidth="2"/>
            </g>
          </pattern>

          {/* 定义小狗图案 - 更细致 */}
          <pattern id="dogPattern" x="0" y="0" width="180" height="180" patternUnits="userSpaceOnUse">
            {/* 小狗 */}
            <g transform="translate(30, 30) rotate(-10)" opacity="0.25">
              {/* 头部 */}
              <ellipse cx="40" cy="40" rx="35" ry="30" fill="none" stroke="#4ecdc4" strokeWidth="2.5"/>
              
              {/* 耳朵 - 更自然下垂 */}
              <ellipse cx="15" cy="30" rx="12" ry="20" fill="none" stroke="#4ecdc4" strokeWidth="2.5" transform="rotate(-20 15 30)"/>
              <ellipse cx="65" cy="30" rx="12" ry="20" fill="none" stroke="#4ecdc4" strokeWidth="2.5" transform="rotate(20 65 30)"/>
              {/* 耳朵内部 */}
              <ellipse cx="17" cy="32" rx="6" ry="10" fill="#a8e6e3" opacity="0.5" transform="rotate(-20 17 32)"/>
              <ellipse cx="63" cy="32" rx="6" ry="10" fill="#a8e6e3" opacity="0.5" transform="rotate(20 63 32)"/>
              
              {/* 眼睛 - 更友善 */}
              <ellipse cx="28" cy="35" rx="6" ry="7" fill="#4ecdc4"/>
              <ellipse cx="52" cy="35" rx="6" ry="7" fill="#4ecdc4"/>
              <ellipse cx="29" cy="34" rx="2" ry="2" fill="white"/>
              <ellipse cx="53" cy="34" rx="2" ry="2" fill="white"/>
              
              {/* 鼻子 */}
              <ellipse cx="40" cy="50" rx="6" ry="5" fill="#4ecdc4"/>
              
              {/* 嘴巴 */}
              <path d="M40 55 Q30 62 22 55" fill="none" stroke="#4ecdc4" strokeWidth="2"/>
              <path d="M40 55 Q50 62 58 55" fill="none" stroke="#4ecdc4" strokeWidth="2"/>
              
              {/* 舌头 - 更可爱 */}
              <path d="M40 55 Q40 68 35 72 Q30 68 30 60" fill="#ff6b9d" opacity="0.6"/>
              
              {/* 身体 */}
              <ellipse cx="40" cy="90" rx="28" ry="22" fill="none" stroke="#4ecdc4" strokeWidth="2.5"/>
              
              {/* 肚子 */}
              <ellipse cx="40" cy="92" rx="20" ry="18" fill="#a8e6e3" opacity="0.3"/>
              
              {/* 尾巴 - 更有动感 */}
              <path d="M65 90 Q85 85 80 105 Q75 110 70 105 Q65 100 65 95" fill="none" stroke="#4ecdc4" strokeWidth="2.5"/>
              
              {/* 爪子 */}
              <ellipse cx="22" cy="108" rx="5" ry="7" fill="none" stroke="#4ecdc4" strokeWidth="2"/>
              <ellipse cx="32" cy="110" rx="5" ry="7" fill="none" stroke="#4ecdc4" strokeWidth="2"/>
              <ellipse cx="48" cy="110" rx="5" ry="7" fill="none" stroke="#4ecdc4" strokeWidth="2"/>
              <ellipse cx="58" cy="108" rx="5" ry="7" fill="none" stroke="#4ecdc4" strokeWidth="2"/>
              
              {/* 项圈 */}
              <ellipse cx="40" cy="70" rx="30" ry="8" fill="none" stroke="#4ecdc4" strokeWidth="2"/>
              <circle cx="40" cy="70" r="3" fill="#ff6b9d"/>
            </g>
          </pattern>

          {/* 混合图案 - 斜着交错排列 */}
          <pattern id="mixedPattern" x="0" y="0" width="360" height="360" patternUnits="userSpaceOnUse">
            <rect width="180" height="180" fill="url(#catPattern)" transform="rotate(5 90 90)"/>
            <rect x="180" y="0" width="180" height="180" fill="url(#dogPattern)" transform="rotate(-8 270 90)"/>
            <rect x="0" y="180" width="180" height="180" fill="url(#dogPattern)" transform="rotate(12 90 270)"/>
            <rect x="180" y="180" width="180" height="180" fill="url(#catPattern)" transform="rotate(-5 270 270)"/>
          </pattern>
        </defs>

        {/* 应用背景图案 */}
        <rect width="100%" height="100%" fill="url(#mixedPattern)"/>
      </svg>
    </div>
  )
}
