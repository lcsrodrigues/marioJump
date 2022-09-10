import { useEffect, useState } from 'react';
import styles from '../styles/mariojump.module.scss';
export default function Home() {

  const [jumpMario, setJumpMario] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    document.addEventListener("keydown", jump);

    const loop = setInterval(() => {
      const pipe = document.getElementById('pipe');
      const mario = document.getElementById('mario');

      const pipePosition = pipe.offsetLeft;
      const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

      if (pipePosition <= 120 && marioPosition < 80 && pipePosition > 0) {
        pipe.style.animation = "none";
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = "none";
        mario.style.bottom = `${marioPosition}px`;

        setGameOver(true);

        clearInterval(loop);
      }
    }, 10);
  }, []);

  const jump = () => {
    setJumpMario(true);
    setTimeout(() => {
      setJumpMario(false);
    }, 500);
  }

  return (
    <>
      <div className={styles.gameBoard}>
        {
          gameOver ?
            < div className={styles.gameOverScreen}>
              <span>Game Over</span>
              <span onClick={() => window.location.reload()}>Reiniciar</span>
            </div>
            :
            ""
        }
        <img src='clouds.png' alt='clouds' className={styles.clouds} />
        <img src='pipe.png' alt='pipe' className={styles.pipe} id="pipe" />
        <img
          src={`${gameOver ? 'game-over.png' : 'mario.gif'}`}
          alt='mario'
          className={`${styles.mario} ${jumpMario ? styles.jump : ""} ${gameOver ? styles.gameOver : ""}`}
          id="mario" />
      </div>
    </>
  )
}
