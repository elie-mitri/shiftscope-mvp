// src/lib/auth-helpers.ts

export function generateAnonymousName(): string {
  const adjectives = [
    'Anonymous', 'Secret', 'Hidden', 'Mystery', 'Silent', 
    'Quiet', 'Private', 'Unknown', 'Stealth', 'Shadow'
  ]
  const nouns = [
    'Worker', 'Server', 'Cook', 'Staff', 'Employee',
    'Bartender', 'Host', 'Chef', 'Manager', 'Helper'
  ]
  const random = Math.floor(Math.random() * 1000)
  
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)]
  const noun = nouns[Math.floor(Math.random() * nouns.length)]
  
  return `${adjective} ${noun} ${random}`
}