# AGENTS.md

## Project: Enduring Finishes Painting Co.

Static marketing site for Enduring Finishes Painting Co. (exterior house painting, Southwest Florida).

- **Business name:** Enduring Finishes Painting Co.
- **Domain:** enduringfinishes.com (www.enduringfinishes.com)
- **Contact email:** quotes@enduringfinishes.com
- **Phone:** (844) 217-6937
- **Stack:** plain HTML/CSS/JS — no build step. Entry point `index.html`, styles in `styles.css`, behavior in `script.js`, assets in `assets/`.
- **Deploy:** `deploy/standalone-vm/` — nginx conf (`enduringfinishes.com.conf`) plus cloud-init seed files (`seed/meta-data`, `seed/user-data`, `seed/network-config`). The seed ISO (`enduringfinishes-seed.iso`) is a generated artifact: rebuild with `xorriso -as mkisofs -output enduringfinishes-seed.iso -volid CIDATA -joliet -rock user-data meta-data network-config` (run inside `seed/`) whenever the seed files change. `*.iso` is gitignored.
- **Design materials:** `Enduring Finishes Painting Co. Materials.dc.html` (gitignored via `*.dc.html`).
