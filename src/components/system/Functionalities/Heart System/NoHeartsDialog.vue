<script setup>
import { useHearts } from '@/composables/PowerUps/useHearts'
import { useRouter } from 'vue-router'

const props = defineProps({
  modelValue: Boolean,
})

const emit = defineEmits(['update:modelValue'])

const router = useRouter()
const { formattedTimeRemaining, hearts } = useHearts()

const close = () => {
  emit('update:modelValue', false)
  router.push('/')
}
</script>

<template>
  <v-dialog :model-value="modelValue" persistent max-width="420">
    <div class="dialog-shell">
      <!-- Floating hearts background animation -->
      <div class="hearts-bg" aria-hidden="true">
        <span v-for="n in 18" :key="n" class="fheart" :class="`fheart--${n}`">♥</span>
        <span v-for="n in 12" :key="'s' + n" class="sparkle" :class="`sparkle--${n}`">✦</span>
      </div>

      <!-- Blur vignette overlay -->
      <div class="vignette" />

      <!-- Card content -->
      <div class="card-content">
        <!-- Icon area -->
        <div class="icon-wrap">
          <div class="icon-glow" />
          <span class="broken-heart">💔</span>
        </div>

        <h2 class="title">Out of Hearts</h2>
        <p class="subtitle">Take a breath — your hearts will return</p>

        <div class="divider" />

        <!-- Options -->
        <div class="options">
          <div class="option-row">
            <div class="option-icon">⏱</div>
            <div class="option-text">
              <span class="option-label">Wait a little</span>
              <span class="option-value">{{ formattedTimeRemaining }} remaining</span>
            </div>
          </div>

          <div class="option-row">
            <div class="option-icon">📖</div>
            <div class="option-text">
              <span class="option-label">Review past lessons</span>
              <span class="option-value">No hearts needed</span>
            </div>
          </div>
        </div>

        <button class="back-btn" @click="close">
          <span>Back to Lessons</span>
        </button>
      </div>
    </div>
  </v-dialog>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=DM+Sans:wght@300;400;500&display=swap');

/* ── Shell ─────────────────────────────────── */
.dialog-shell {
  position: relative;
  border-radius: 28px;
  overflow: hidden;
  background: linear-gradient(160deg, #1a0010 0%, #2d0020 40%, #1a0018 100%);
  box-shadow:
    0 0 0 1px rgba(255, 100, 150, 0.15),
    0 32px 80px rgba(0, 0, 0, 0.7),
    0 0 120px rgba(200, 30, 80, 0.12);
  min-height: 480px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ── Vignette ───────────────────────────────── */
.vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 50% 110%, transparent 40%, rgba(10, 0, 15, 0.6) 100%);
  pointer-events: none;
  z-index: 1;
}

/* ── Floating hearts ────────────────────────── */
.hearts-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.fheart {
  position: absolute;
  bottom: -40px;
  font-size: 1rem;
  opacity: 0;
  filter: blur(0.5px);
  animation: floatUp linear infinite;
  will-change: transform, opacity;
}

/* Varied sizes, positions, speeds, delays */
.fheart--1 {
  left: 5%;
  font-size: 1.4rem;
  color: #ff6b8a;
  animation-duration: 9s;
  animation-delay: 0s;
  filter: blur(0px) drop-shadow(0 0 6px #ff4466);
}
.fheart--2 {
  left: 12%;
  font-size: 0.7rem;
  color: #ff9eb5;
  animation-duration: 12s;
  animation-delay: 1.5s;
  filter: blur(1px) drop-shadow(0 0 4px #ff6688);
}
.fheart--3 {
  left: 22%;
  font-size: 1.8rem;
  color: #e0336a;
  animation-duration: 8s;
  animation-delay: 3s;
  filter: blur(0px) drop-shadow(0 0 10px #ff2255);
}
.fheart--4 {
  left: 30%;
  font-size: 0.9rem;
  color: #ffb3c6;
  animation-duration: 14s;
  animation-delay: 0.5s;
  filter: blur(1.5px) drop-shadow(0 0 5px #ff99aa);
}
.fheart--5 {
  left: 40%;
  font-size: 2.2rem;
  color: #ff4477;
  animation-duration: 10s;
  animation-delay: 2s;
  filter: blur(0px) drop-shadow(0 0 14px #ff2255);
}
.fheart--6 {
  left: 50%;
  font-size: 0.6rem;
  color: #ffc2d4;
  animation-duration: 16s;
  animation-delay: 4s;
  filter: blur(2px) drop-shadow(0 0 3px #ffaacc);
}
.fheart--7 {
  left: 58%;
  font-size: 1.2rem;
  color: #ff7799;
  animation-duration: 11s;
  animation-delay: 1s;
  filter: blur(0.5px) drop-shadow(0 0 8px #ff4466);
}
.fheart--8 {
  left: 68%;
  font-size: 1.6rem;
  color: #e83366;
  animation-duration: 9.5s;
  animation-delay: 3.5s;
  filter: blur(0px) drop-shadow(0 0 12px #ff1144);
}
.fheart--9 {
  left: 75%;
  font-size: 0.8rem;
  color: #ffaabb;
  animation-duration: 13s;
  animation-delay: 0.8s;
  filter: blur(1.2px) drop-shadow(0 0 5px #ff8899);
}
.fheart--10 {
  left: 85%;
  font-size: 2rem;
  color: #ff3366;
  animation-duration: 8.5s;
  animation-delay: 5s;
  filter: blur(0px) drop-shadow(0 0 16px #ff0044);
}
.fheart--11 {
  left: 93%;
  font-size: 1rem;
  color: #ff99b3;
  animation-duration: 15s;
  animation-delay: 2.5s;
  filter: blur(1px) drop-shadow(0 0 6px #ff7799);
}
.fheart--12 {
  left: 8%;
  font-size: 2.4rem;
  color: #cc2255;
  animation-duration: 7s;
  animation-delay: 6s;
  filter: blur(0px) drop-shadow(0 0 18px #ee1155);
  opacity: 0.4;
}
.fheart--13 {
  left: 35%;
  font-size: 0.5rem;
  color: #ffccd8;
  animation-duration: 18s;
  animation-delay: 1.2s;
  filter: blur(2.5px);
}
.fheart--14 {
  left: 47%;
  font-size: 1.5rem;
  color: #ff5588;
  animation-duration: 10.5s;
  animation-delay: 7s;
  filter: drop-shadow(0 0 10px #ff3366);
}
.fheart--15 {
  left: 62%;
  font-size: 0.7rem;
  color: #ffb0c8;
  animation-duration: 20s;
  animation-delay: 3.8s;
  filter: blur(2px);
}
.fheart--16 {
  left: 78%;
  font-size: 1.9rem;
  color: #ff2255;
  animation-duration: 8s;
  animation-delay: 0.3s;
  filter: drop-shadow(0 0 14px #ff0033);
  opacity: 0.5;
}
.fheart--17 {
  left: 17%;
  font-size: 1.1rem;
  color: #ff88aa;
  animation-duration: 11.5s;
  animation-delay: 4.5s;
  filter: drop-shadow(0 0 7px #ff5577);
}
.fheart--18 {
  left: 55%;
  font-size: 2.6rem;
  color: #bb1144;
  animation-duration: 6.5s;
  animation-delay: 8s;
  filter: blur(0px) drop-shadow(0 0 20px #ff0055);
  opacity: 0.35;
}

/* ── Sparkles ───────────────────────────────── */
.sparkle {
  position: absolute;
  font-size: 0.5rem;
  color: #ffccdd;
  opacity: 0;
  animation: sparkleFade ease-in-out infinite;
  will-change: opacity, transform;
}
.sparkle--1 {
  top: 15%;
  left: 10%;
  animation-duration: 3s;
  animation-delay: 0s;
}
.sparkle--2 {
  top: 25%;
  left: 80%;
  animation-duration: 4s;
  animation-delay: 1s;
}
.sparkle--3 {
  top: 60%;
  left: 20%;
  animation-duration: 3.5s;
  animation-delay: 0.5s;
}
.sparkle--4 {
  top: 40%;
  left: 70%;
  animation-duration: 5s;
  animation-delay: 2s;
}
.sparkle--5 {
  top: 75%;
  left: 50%;
  animation-duration: 4.5s;
  animation-delay: 1.5s;
}
.sparkle--6 {
  top: 10%;
  left: 45%;
  animation-duration: 3.2s;
  animation-delay: 0.8s;
}
.sparkle--7 {
  top: 55%;
  left: 88%;
  animation-duration: 6s;
  animation-delay: 3s;
}
.sparkle--8 {
  top: 30%;
  left: 35%;
  animation-duration: 3.8s;
  animation-delay: 2.5s;
}
.sparkle--9 {
  top: 80%;
  left: 15%;
  animation-duration: 5.5s;
  animation-delay: 1.2s;
}
.sparkle--10 {
  top: 20%;
  left: 60%;
  animation-duration: 4.2s;
  animation-delay: 0.3s;
}
.sparkle--11 {
  top: 65%;
  left: 40%;
  animation-duration: 3.7s;
  animation-delay: 4s;
}
.sparkle--12 {
  top: 45%;
  left: 92%;
  animation-duration: 5s;
  animation-delay: 2.8s;
}

/* ── Card content ───────────────────────────── */
.card-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 44px 36px 40px;
  width: 100%;
  text-align: center;
}

/* ── Broken heart icon ──────────────────────── */
.icon-wrap {
  position: relative;
  margin-bottom: 20px;
}

.icon-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 50, 100, 0.3) 0%, transparent 70%);
  animation: pulseGlow 3s ease-in-out infinite;
}

.broken-heart {
  font-size: 72px;
  display: block;
  animation: heartPulse 3s ease-in-out infinite;
  filter: drop-shadow(0 0 20px rgba(255, 60, 100, 0.6));
}

/* ── Typography ─────────────────────────────── */
.title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2rem;
  font-weight: 600;
  color: #fff0f4;
  margin: 0 0 8px;
  letter-spacing: 0.02em;
  text-shadow: 0 0 30px rgba(255, 100, 140, 0.4);
}

.subtitle {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.85rem;
  font-weight: 300;
  color: rgba(255, 200, 215, 0.7);
  margin: 0 0 24px;
  letter-spacing: 0.04em;
}

/* ── Divider ────────────────────────────────── */
.divider {
  width: 48px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 100, 140, 0.5), transparent);
  margin-bottom: 28px;
}

/* ── Option rows ────────────────────────────── */
.options {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 32px;
}

.option-row {
  display: flex;
  align-items: center;
  gap: 16px;
  background: rgba(255, 80, 120, 0.07);
  border: 1px solid rgba(255, 100, 140, 0.12);
  border-radius: 14px;
  padding: 14px 18px;
  text-align: left;
  transition: background 0.3s;
}

.option-row:hover {
  background: rgba(255, 80, 120, 0.13);
}

.option-icon {
  font-size: 1.4rem;
  width: 36px;
  text-align: center;
  flex-shrink: 0;
}

.option-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.option-label {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  color: #ffe0ea;
}

.option-value {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.78rem;
  font-weight: 300;
  color: rgba(255, 180, 200, 0.6);
}

/* ── Button ─────────────────────────────────── */
.back-btn {
  width: 100%;
  padding: 15px;
  border-radius: 14px;
  border: none;
  cursor: pointer;
  background: linear-gradient(135deg, #c0195a 0%, #e8336e 50%, #c0195a 100%);
  background-size: 200% 100%;
  background-position: right;
  color: #fff5f8;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  transition:
    background-position 0.4s ease,
    box-shadow 0.3s ease,
    transform 0.15s ease;
  box-shadow:
    0 6px 24px rgba(200, 30, 80, 0.35),
    0 0 0 1px rgba(255, 100, 140, 0.2);
}

.back-btn:hover {
  background-position: left;
  box-shadow:
    0 8px 32px rgba(220, 40, 90, 0.55),
    0 0 0 1px rgba(255, 130, 160, 0.35);
  transform: translateY(-1px);
}

.back-btn:active {
  transform: translateY(0px);
}

/* ── Keyframes ──────────────────────────────── */
@keyframes floatUp {
  0% {
    transform: translateY(0) translateX(0) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 0.7;
  }
  85% {
    opacity: 0.5;
  }
  100% {
    transform: translateY(-110vh) translateX(20px) rotate(25deg);
    opacity: 0;
  }
}

@keyframes sparkleFade {
  0%,
  100% {
    opacity: 0;
    transform: scale(0.5) rotate(0deg);
  }
  50% {
    opacity: 0.9;
    transform: scale(1.4) rotate(45deg);
  }
}

@keyframes pulseGlow {
  0%,
  100% {
    opacity: 0.6;
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.25);
  }
}

@keyframes heartPulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.06);
  }
}
</style>
