import React, { useEffect, useState } from 'react';
import { eventBusService } from '../services/event-bus.service.js';

export const UserMsg = () => {
  var removeEvent;

  const [msg, setMsg] = useState(null);

  useEffect(() => {
    removeEvent = eventBusService.on('show-user-msg', (msg) => {
      setMsg(msg);
      setTimeout(() => {
        setMsg(null);
      }, 2500);
    });
    return () => {
      removeEvent();
    };
  }, []);

  if (!msg) return <span></span>;
  const msgClass = msg.type || '';
  return (
    <section className={'user-msg ' + msgClass}>
      {msg.txt}
      <p>test test</p>
    </section>
  );
};
