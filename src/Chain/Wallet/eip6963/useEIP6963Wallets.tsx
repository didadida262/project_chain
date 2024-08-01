
import { useEffect, useState } from 'react';

import {
  EIP6963AnnounceProviderEvent,
  EIP6963ProviderDetail
} from './EthereumProviderTypes';

declare global {
  interface WindowEventMap {
    'eip6963:announceProvider': CustomEvent<EIP6963AnnounceProviderEvent>;
  }
}

let providers: EIP6963ProviderDetail[] = [];

export const store = {
  value: () => providers,

  subscribe: (callback: () => void) => {
    function onAnnouncement(event: EIP6963AnnounceProviderEvent) {
      // Prevent adding a provider if it already exists in the list based on its uuid.
      if (providers.some((p) => p.info.uuid === event.detail.info.uuid)) return;

      // Add the new provider to the list and call the provided callback function.
      providers = [...providers, event.detail];
      callback();
    }

    window.addEventListener(
      'eip6963:announceProvider',
      onAnnouncement as unknown as EventListener
    );
    window.dispatchEvent(new Event('eip6963:requestProvider'));

    return () =>
      window.removeEventListener(
        'eip6963:announceProvider',
        onAnnouncement as unknown as EventListener
      );
  }
};

export const useEIP6963Wallets = () => {
  const [providers, setProviders] = useState<EIP6963ProviderDetail[]>([]);
  useEffect(() => {
    function onAnnouncement(event: EIP6963AnnounceProviderEvent) {
      // Prevent adding a provider if it already exists in the list based on its uuid.
      if (providers.some((p) => p.info.uuid === event.detail.info.uuid)) return;
      // Add the new provider to the list and call the provided callback function.
      setProviders((prev) => [...prev, event.detail]);
    }

    window.addEventListener(
      'eip6963:announceProvider',
      onAnnouncement as unknown as EventListener
    );
    window.dispatchEvent(new Event('eip6963:requestProvider'));

    return () => {
      window.removeEventListener(
        'eip6963:announceProvider',
        onAnnouncement as unknown as EventListener
      );
      setProviders([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { providers };
};
