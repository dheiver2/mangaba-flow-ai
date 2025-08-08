import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Mangaba Advanced Colors
				mangaba: {
					gold: 'hsl(var(--mangaba-gold))',
					'gold-dark': 'hsl(var(--mangaba-gold-dark))',
					'gold-light': 'hsl(var(--mangaba-gold-light))',
					orange: 'hsl(var(--mangaba-orange))',
					'orange-dark': 'hsl(var(--mangaba-orange-dark))',
					'orange-light': 'hsl(var(--mangaba-orange-light))',
					green: 'hsl(var(--mangaba-green))',
					'green-dark': 'hsl(var(--mangaba-green-dark))',
					'green-light': 'hsl(var(--mangaba-green-light))',
					yellow: 'hsl(var(--mangaba-yellow))',
					'yellow-dark': 'hsl(var(--mangaba-yellow-dark))',
					'yellow-light': 'hsl(var(--mangaba-yellow-light))',
					earth: 'hsl(var(--mangaba-earth))',
					'earth-dark': 'hsl(var(--mangaba-earth-dark))',
					'earth-light': 'hsl(var(--mangaba-earth-light))',
					cream: 'hsl(var(--mangaba-cream))',
					sand: 'hsl(var(--mangaba-sand))',
					bark: 'hsl(var(--mangaba-bark))'
				}
			},
			backgroundImage: {
				'gradient-mangaba-hero': 'var(--gradient-mangaba-hero)',
				'gradient-mangaba-primary': 'var(--gradient-mangaba-primary)',
				'gradient-mangaba-secondary': 'var(--gradient-mangaba-secondary)',
				'gradient-tropical': 'var(--gradient-tropical)',
				'gradient-sunset': 'var(--gradient-sunset)',
				'gradient-canvas': 'var(--gradient-canvas)',
				'gradient-feature': 'var(--gradient-feature)',
				'gradient-card': 'var(--gradient-card)'
			},
			boxShadow: {
				'mangaba': 'var(--shadow-mangaba)',
				'mangaba-lg': 'var(--shadow-mangaba-lg)',
				'node': 'var(--shadow-node)',
				'float': 'var(--shadow-float)',
				'glow': 'var(--shadow-glow)',
				'feature': 'var(--shadow-feature)'
			},
			transitionTimingFunction: {
				'bounce-gentle': 'var(--bounce-gentle)',
				'ease-flow': 'var(--ease-flow)'
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'glow': 'glow 4s ease-in-out infinite alternate',
				'gradient': 'gradient 8s ease infinite'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
