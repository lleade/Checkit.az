import Container from "../container/Container";

import { InstagramIcon, WhatsAppIcon } from "../common/Icons";

export default function SocialBar() {
  return (
    <div className="bg-footer py-4">
      <Container className="flex items-center justify-between py-3">
        <span className="text-sm font-medium text-white">Sosialda Biz:</span>

        <div className="flex items-center gap-3">
          <a
            href="https://www.instagram.com/checkit.az"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/30 text-white transition-colors hover:bg-white/10"
          >
            <InstagramIcon className="h-5 w-5" />
          </a>

          <a
            href="https://wa.me/994504488035"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/30 text-white transition-colors hover:bg-white/10"
          >
            <WhatsAppIcon className="h-5 w-5" />
          </a>
        </div>
      </Container>
    </div>
  );
}
