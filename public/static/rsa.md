## Python Example Code

The values are taken from [the Wikipedia page on RSA](https://en.wikipedia.org/wiki/RSA_(cryptosystem)).

```python
#!/usr/bin/env python

# Greatest Common Devisor
def gcd(a, b):
	(r2, r1) = (a, b)
	while r1 != 0:
		quotient = r2 // r1
		(r2, r1) = (r1, r2 - quotient * r1)
	return r2

# Modular Multiplicative Inverse
def inverse(a, b):
	r2, r1 = a, b
	t2, t1 = 1, 0

	while r1 > 0:
		q = r2 // r1
		t2, t1 = t1, t2 - t1 * q
		r2, r1 = r1, r2 - r1 * q
	while t2 < 0:
		t2 = t2 + b
	return t2

def lcm(a, b):
	return (a * b) // gcd(a, b)

p = 61 # Private key p
q = 53 # First factor of the modulus
e = 17 # Public key e
c = 65 # Cipher text c

# n is the modulus for the public key and the private keys
n = p * q
lcm = lcm( (p - 1), (q - 1) )
d = inverse(e, lcm)

print(f"Encrypting {c} ... ")
enc = pow(c, e, n)
print(f"Cipher text: {enc}")
print(f"Decrypting cipher text: {enc}");
dec = pow(enc, d, n)
print(f"Original message: {dec}")
```

With the output:
```
Encrypting 65 ... 
Cipher text: 2790
Decrypting cipher text: 2790
Original message: 65
```
