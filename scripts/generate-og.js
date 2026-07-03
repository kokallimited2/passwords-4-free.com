#!/usr/bin/env node
/**
 * OG Image Generator — uses satori + sharp to create social media cards
 * 
 * Usage: node scripts/generate-og.js "Post Title" "passwords-4-free.com" "output.png"
 * 
 * Requires: satori, sharp (install with: npm install satori sharp)
 */

const satori = require('satori');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Defaults
const TITLE = process.argv[2] || 'Passwords4Free — Free Strong Password Maker & Checker';
const DOMAIN = process.argv[3] || 'passwords-4-free.com';
const OUTPUT = process.argv[4] || 'og-image.png';

async function main() {
  // Load font
  const fontPath = path.join(__dirname, '..', 'assets', 'Fredoka-Bold.ttf');
  let fontData;
  try {
    fontData = fs.readFileSync(fontPath);
  } catch {
    // Fallback — use bundled or download from Google Fonts
    console.log('Font not found at', fontPath);
    console.log('Download Fredoka Bold from https://fonts.google.com/specimen/Fredoka');
    process.exit(1);
  }

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: 1200,
          height: 630,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#fff8f0',
          padding: '60px',
          position: 'relative',
        },
        children: [
          // Decorative sphere
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                top: '-120px',
                right: '-80px',
                width: '400px',
                height: '400px',
                borderRadius: '50%',
                background: 'radial-gradient(ellipse, rgba(124,58,237,.12) 0%, transparent 70%)',
              }
            }
          },
          // Bottom accent
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '8px',
                background: '#7c3aed',
              }
            }
          },
          // Shield icon
          {
            type: 'div',
            props: {
              style: {
                fontSize: 48,
                marginBottom: 20,
                color: '#7c3aed',
              },
              children: '🛡️'
            }
          },
          // Title
          {
            type: 'div',
            props: {
              style: {
                fontSize: 56,
                fontWeight: 700,
                color: '#1a1430',
                textAlign: 'center',
                lineHeight: 1.15,
                maxWidth: 900,
                fontFamily: 'Fredoka',
              },
              children: TITLE
            }
          },
          // Domain
          {
            type: 'div',
            props: {
              style: {
                fontSize: 24,
                color: '#7c3aed',
                marginTop: 24,
                fontWeight: 600,
                fontFamily: 'Fredoka',
                padding: '8px 20px',
                border: '2px solid #1a1430',
                borderRadius: 999,
                background: '#ffd23f',
                boxShadow: '3px 3px 0 #1a1430',
              },
              children: DOMAIN
            }
          }
        ]
      }
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Fredoka',
          data: fontData,
          weight: 700,
          style: 'normal',
        }
      ]
    }
  );

  // Convert SVG to PNG
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  fs.writeFileSync(OUTPUT, png);
  console.log(`✅ OG image saved: ${OUTPUT} (${(png.length / 1024).toFixed(1)} KB)`);
}

main().catch(console.error);
