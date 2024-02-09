import { useState, useEffect } from 'react';

const useServiceWorker = (isOnline, isLoggedIn) => {
  const [usingSW, setUsingSW] = useState("serviceWorker" in navigator);
  const [swRegistration, setSWRegistration] = useState(null);
  const [svcworker, setSvcWorker] = useState(null);

	function sendStatusUpdate(target) {
		sendSWMessage({ statusUpdate: { isOnline, isLoggedIn } },target);
	}

  const sendSWMessage = (msg, target) => {
    if (target) {
      target.postMessage(msg);
    } else if (svcworker) {
      svcworker.postMessage(msg);
    } else if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage(msg);
    }
  };

  const onControllerChange = () => {
    const newSvcWorker = navigator.serviceWorker.controller;
    setSvcWorker(newSvcWorker);
    sendStatusUpdate(newSvcWorker);
  };

  const onSWMessage = (event) => {
    console.log("Service Worker Message Received:", event.data);
    var { data } = event;
    if (data.statusUpdateRequest) {
        console.log("Status update requested from service worker, responding...");
        sendStatusUpdate(event.ports && event.ports[0]);
    }
    else if (data == "force-logout") {
        document.cookie = "isLoggedIn=";
        // isLoggedIn = false;
        sendStatusUpdate();
    }
  };


  const initServiceWorker = async () => {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js", {
        updateViaCache: "none",
      });

      setSWRegistration(registration);
      const worker = registration.installing || registration.waiting || registration.active;
      setSvcWorker(worker);
      sendStatusUpdate(worker);

      // listen for new service worker to take over
      navigator.serviceWorker.addEventListener("controllerchange", onControllerChange);

      // listen for messages from service worker
      navigator.serviceWorker.addEventListener("message", onSWMessage, false);
    } catch (error) {
      console.error("Error initializing service worker:", error);
    }
  };

  const cleanupServiceWorker = async () => {
    if (swRegistration) {
      try {
        await swRegistration.unregister();
        console.log("Service Worker unregistered successfully");
      } catch (error) {
        console.error("Error during Service Worker unregister:", error);
      }
    }
  };

  useEffect(() => {
    if (usingSW) {
      initServiceWorker();
    }

    return () => {
      cleanupServiceWorker();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { usingSW, swRegistration, svcworker, sendSWMessage, sendStatusUpdate };
};

export default useServiceWorker;
