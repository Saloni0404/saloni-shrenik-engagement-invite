import { createRoot } from 'react-dom/client';
import { CalendarDays, Clock, MapPin, Phone, Mail,Youtube} from 'lucide-react';
import { invite } from './inviteConfig';
import './styles.css';
import React, { useState, useRef, useEffect } from 'react';

function Detail({icon, label, href}){
  return <a className="detail glow-link" href={href} target={href?.startsWith('http')?'_blank':undefined} rel="noreferrer">
    {icon}<span>{label}</span>
  </a>
}
function Page({ n, children }) {
  return (
    <section
      className={`page page${n}`}
      style={{
        backgroundImage:
          `url(${invite.images.backgrounds[n - 1]})`
      }}
    >
      {children}
    </section>
  );
}
function FallingPetals() {
 return (
   <div className="petal-overlay">
     {[...Array(20)].map((_, i) => (
       <div
         key={i}
         className="petal"
         style={{
           left: `${Math.random() * 100}%`,
           animationDelay: `${Math.random() * 10}s`,
           animationDuration: `${10 + Math.random() * 8}s`,
         }}
       />
     ))}
   </div>
 );
}

function App(){
  const [form, setForm] = useState({
    name: '',
    attending: 'Yes',
    adults: 1,
    kids: 0,

    dietary: '',
    accommodation: 'No',
    accommodationGuests: 0
  });
  const audioRef = useRef(null);

const [playing, setPlaying] = useState(false);
useEffect(() => {
  const startMusic = async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play();
        setPlaying(true);
      } catch (err) {
        console.log('Autoplay blocked');
      }
    }
    window.removeEventListener(
      'click',
      startMusic
    );
    window.removeEventListener(
      'touchstart',
      startMusic
    );
    window.removeEventListener(
      'scroll',
      startMusic
    );
  };
  window.addEventListener(
    'click',
    startMusic
  );
  window.addEventListener(
    'touchstart',
    startMusic
  );
  window.addEventListener(
    'scroll',
    startMusic
  );
}, []);

useEffect(() => {
  const handleVisibilityChange = () => {
    if (!audioRef.current) return;
    if (document.hidden) {
      audioRef.current.pause();
      setPlaying(false);
    }
  };
  const handleBeforeUnload = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };
  document.addEventListener(
    'visibilitychange',
    handleVisibilityChange
  );
  window.addEventListener(
    'beforeunload',
    handleBeforeUnload
  );
  return () => {
    document.removeEventListener(
      'visibilitychange',
      handleVisibilityChange
    );
    window.removeEventListener(
      'beforeunload',
      handleBeforeUnload
    );
  };
}, []);

const toggleMusic = () => {
  if (!audioRef.current) return;
  if (playing) {
    audioRef.current.pause();
  } else {
    audioRef.current.play();
  }
  setPlaying(!playing);
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        'https://script.google.com/macros/s/AKfycbz4V3mzxBi2LPVgUpBRO-KBhoBv9bG1RtM4K6BWceehc0DKOsddL_vvYojwqxNw07HkhA/exec',
        {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: form.name,
            attending: form.attending,
            adults: form.adults,
            kids: form.kids,
            dietary: form.dietary,
            accommodation: form.accommodation,
            accommodationGuests: form.accommodationGuests
          }),
        }
      );
      alert('RSVP submitted successfully ❤️');
      setForm({
        name: '',
        attending: 'Yes',
        adults: 1,
        kids: 0,
        dietary: '',
        accommodation: 'No',
        accommodationGuests: 0
      });
    } catch (error) {
      console.error(error);
      alert('Something went wrong. Please try again.');
    }
  };
return (
  <>
    <FallingPetals />
     <main className={!opened ? "invite-locked" : ""}>

<Page n={1}>
  {!opened && (
 <div
   className="invite-overlay"
   onClick={openInvitation}
 >
   <div className="overlay-content">
     <h2>
       Tap to Open Invitation
     </h2>
   </div>
 </div>
)}
  <div className="hero-card fade-up">
  
    {/*
    <img
      src={invite.images.logo}
      className="logo static-logo"
      alt="Logo"
    />
    */}
    {/*
    <h1 className="hero-title">
      Saloni & Shrenik's
      <span>Engagement Ceremony</span>
    </h1>
    */}
    {/*
    <div className="divider">
      <span></span>♥<span></span>
    </div>
    */}
    {/*
    <p className="subtitle">
      {invite.subtitle}
    </p>
    */}
    <div className="scroll-note">
      Scroll to open
    </div>
  </div>
</Page>

<Page n={2}>

  <div className="invite-layout">

    {/* =========================================
       COMMENTED PAGE 2 HEADER SECTION
    ========================================== */}

    {/*
    <p className="eyebrow fade-up">  
      <span>
        We would like to invite you to
      </span>

      <span>
        engagement ceremony of
      </span>
    </p>

    <div className="divider-page2">
      <span></span>♥<span></span>
    </div>
    */}

    {/* =========================================
       COMMENTED PAGE 2 COUPLE SECTION
    ========================================== */}

    {/*
    <div className="invite-copy fade-up">

      <h2>{invite.names}</h2>

      <div className="couple-grid">

        <div className="person-block">

          <h2 className="couple-name">
            Saloni
          </h2>

          <p className="family-label">
            (Daughter of)
          </p>

          <p className="family-name">
            Jayshree & Rajendra Burad
          </p>

        </div>

        <div className="couple-ampersand">
          &
        </div>

        <div className="person-block">

          <h2 className="couple-name">
            Shrenik
          </h2>

          <p className="family-label">
            (Son of)
          </p>

          <p className="family-name">
            Shailaja & Sanjay Changede
          </p>

        </div>

      </div>

    </div>
    */}

    {/* =========================================
       KEEP ONLY DETAILS ROW
    ========================================== */}

    <div className="details-row">

      <Detail
        icon={<CalendarDays/>}
        label={invite.dateLabel}
        href={invite.calendarLink}
      />
      <Detail
        icon={<Clock/>}
        label={invite.timeLabel}
        href={invite.calendarLink}
      />
      <Detail
        icon={<MapPin/>}
        label={invite.locationShort}
        href={invite.mapLink}
      />
      <Detail
      icon={<Youtube/>}
      label="Watch Live on YouTube"
      href="https://youtube.com/live/bO4-3baMvlU?feature=share"
      />
      <Detail
        icon={<Phone className="mini-phone"/>}
        label="Saloni: +1 (412) 805-0867"
        href="tel:+14128050867"
      />
      <Detail
        icon={<Phone className="mini-phone"/>}
        label="Shrenik: +1 (470) 398-7738"
        href="tel:+14703987738"
      />
    </div>
  

    {/* =========================================
       COMMENTED COUPLE IMAGE
    ========================================== */}

    {/*
    <div className="couple-wrap">

      <img
        src={invite.images.couple}
        className="couple"
        alt="Illustration of couple"
      />

    </div>
    */}

  </div>

</Page>
  <Page n={3}>
    <div className="page3-inner fade-up">
      <h2 className="closing-title">{invite.message}</h2>
      <section className="stack-card rsvp-card">
        <Mail className="section-icon"/><h3>Kindly RSVP</h3>
        <p>Let us know if you can make it!</p>
        <form onSubmit={handleSubmit} className="rsvp-form">
        <input
          type="text"
          placeholder="Your Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <label>Attending</label>
         <select
         className={
            form.attending ? 'selected' : ''
          }
          onChange={(e) => setForm({ ...form, attending: e.target.value })}
        >
          <option>Yes</option>
          <option>No</option>
          </select>
        <label>Adults</label>
          <input
          type="number"
          min="0"
          value={form.adults}
          onChange={(e) => setForm({ ...form, adults: e.target.value })}
        />
        <label>Kids</label>
          <input
          type="number"
          min="0"
          value={form.kids}
          onChange={(e) => setForm({ ...form, kids: e.target.value })}
        />
        <label>Any Dietary Restrictions?</label>
          <input
          type="text"
          placeholder="None"
          value={form.dietary}
          onChange={(e) => setForm({ ...form, dietary: e.target.value })}
        />
       <label>Need Accommodation?</label>
          <select
          value={form.accommodation}
          onChange={(e) => setForm({ ...form, accommodation: e.target.value })}
          >
         <option>No</option>
         <option>Yes</option>
        </select>
        <label>Accommodation Guest Count</label>
         <input
          type="number"
          min="0"
          value={form.accommodationGuests}
          onChange={(e) =>
          setForm({ ...form, accommodationGuests: e.target.value })
          }
        />
        <button type="submit" className="pill">
          Submit RSVP 
        </button>      
</form>
    
      
      </section>
     {/*
      <section className="stack-card map-card">
        <MapPin className="section-icon"/>
        <h3>Getting There</h3>
        <p>{invite.address}</p>
        <p className="airport">{invite.airportLine}</p>
        <a
          className="pill"
          href={invite.mapLink}
          target="_blank"
          rel="noreferrer"
        >
          View on Map ↗
        </a>
      </section>
      */}
     {/*
      <section className="stack-card contacts">
        <Phone className="section-icon"/>
        <h3>Contact</h3>
        {invite.contacts.map(c =>
          <a
            key={c.name}
            href={`tel:${c.phone.replaceAll(' ','')}`}
            className="contact-line"
          >
            <b>{c.name}</b>
            <span>{c.phone}</span>
          </a>
        )}
      </section>
      */}
      <p className="final-giftline">{invite.giftLine}</p>
      <p className="final-line">{invite.closing}</p>
      
    </div>
  </Page>
 
    <audio
      ref={audioRef}
      loop
      preload="auto"
      playsInline
    >
    <source
    src="/music/nazm-nazm.mp3"
    type="audio/mpeg"
    />
    </audio>

  <button
    className="music-btn"
    onClick={toggleMusic}
  >
    {playing ? '❚❚ ' : '▶'}
   </button>

</main>
  </>
);
}
createRoot(document.getElementById('root')).render(<App />);





