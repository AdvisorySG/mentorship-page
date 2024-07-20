import React from "react";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import Canvas from "../components/Canvas";
import "../styles/App.css";

interface QNA {
  question: string;
  answer: React.ReactNode;
}

const PROGRAMME_QUESTIONS: QNA[] = [
  {
    question:
      "How does the programme work and what will be covered in the monthly meetings?",
    answer: (
      <>
        <p>
          The Advisory Mentorship Programme is a four-month structured
          mentorship programme consisting of a one-hour session each month, from
          August to November.
        </p>
        <p>
          The consistency and timings of meetings would be dependent on the
          individual availability of mentees and their mentors. In terms of the
          content covered in each meeting, while we do ultimately leave it to
          the discretion of the individual mentee-mentor pairs, we have also
          provided a suggested structure for each month’s session in our Mentee
          Manual, which is distributed to all confirmed mentees before the
          commencement of the programme.
        </p>
        <p>
          Very briefly, we recommend the first month’s session be used for you
          and your mentor to set some ground rules and expectations, and to get
          to know one another better. The second session on “understanding
          career interests” could be a chance for your mentor to share how they
          navigated their own career path, to provide you with some insights on
          how to bridge the gap between school and work. The third session on
          “understanding next steps” consolidates the discussions of the past
          two sessions. It is a good time for your mentor to offer you some
          advice on the practical steps you can take post-mentorship to pursue
          your occupation(s) of interest. The fourth session on “working on next
          steps” would allow mentors to offer guidance on how you can proceed
          from where you are now, to where you want to be. This can be through
          actionables or tasks, and so on.
        </p>
      </>
    ),
  },
  {
    question:
      "Would there be possible internship opportunities during or following the mentorship?",
    answer: (
      <>
        <p>
          Though we have seen very heartening cases of mentors who have helped
          to arrange internships for their mentees, our mentors are not obliged
          to provide any internships or other forms of employment to their
          mentees. This should not be an expectation going into the programme,
          and we ultimately leave it to the individual mentor's discretion as to
          how they would like to tailor their guidance and support to their
          mentees.
        </p>
      </>
    ),
  },
  {
    question: "Can we continue to meet our mentors beyond the programme?",
    answer: (
      <>
        <p>
          Yes! Mentees are encouraged to stay in contact with their mentors and
          continue the relationship beyond the programme as long as both parties
          wish to do so. However, do take note that your contact with your
          Mentor is no longer affiliated with nor facilitated by Advisory after
          the duration of the programme, but on the basis of your own
          independence.
        </p>
      </>
    ),
  },
];

const APPLICATION_QUESTIONS: QNA[] = [
  {
    question:
      "How many mentors can I select in my application? What if I do not get matched with any of my choices?",
    answer: (
      <>
        <p>
          In your application, you will be allowed to indicate up to{" "}
          <b>three</b> mentors of your choice. For each of your choices, you
          will be prompted to share with us in more than 150 words on why you
          would like to be matched with the particular mentor. (For more
          information on what we look out for in your application, you may refer
          to our{" "}
          <a href="https://drive.google.com/file/d/1aA3l_WQ1ehGO8UBKuRFLqj4URpQbAVzN/view">
            Sample Application Response
          </a>
          .)
        </p>
        <p>
          In the sign-up form, you will also be prompted to indicate three
          industries (out of our list of 48) which you are most interested in,
          as well as to tell us whether you would be open to being matched with
          a mentor beyond your three choices. In the event that we are not able
          to allocate to you any of your top three mentor choices, should your
          application be found suitable, you may be allocated a mentor whose
          industry or fields of expertise match those of your interest.
        </p>
      </>
    ),
  },
  {
    question: "What if I’m unsure about my industries of interest?",
    answer: (
      <>
        <p>
          Our mentorship website contains a link to our list of 48 industries by
          which we categorise our mentors’ areas of expertise. If you are
          experiencing any difficulties in deciding on your industries of
          interest, we would encourage you to take some time to read through the
          list, and shortlist a couple of industries that you may be most
          interested in. Following which, you may use the “Industry” search
          filter function to find possible mentors from your fields of interest.
        </p>
      </>
    ),
  },
  {
    question:
      "What can I do if I’m passionate about a field but not entirely sure whether I want to join the industry at the end of the day?",
    answer: (
      <>
        <p>
          We would encourage you to apply either way! One important aspect of
          mentorship is that you have the opportunity to learn about whether a
          job or industry is right for you, and we do have mentees who,
          following the mentorship programme, have decided to embark on other
          career paths which they had previously not considered. There are many
          students who are still in their exploratory phases, and it’s perfectly
          okay to change your mind!
        </p>
      </>
    ),
  },
  {
    question:
      "The application form requires a CV. Are younger students at a disadvantage since their experiences may not be as extensive as older students?",
    answer: (
      <>
        <p>
          The purpose of collecting your CV would really be to give us a sense
          of who you are, and we have students from across the whole age range
          getting matched with mentors. The most important aspect of your
          application would be what you share with us about the mentors you want
          to be matched with and why - the most compelling answers are genuine,
          and you don’t have to have the most experience! Many things count as
          experience - not just formal work experience of achievements, but also
          free courses you’ve done on the side, things you’ve read, hobbies you
          have, etc. We encourage everyone to take the leap - you never know if
          you’ll be the lucky person to get your first choice mentor!
        </p>
      </>
    ),
  },
  {
    question:
      "Will my academic results or language ability be taken into consideration in my application?",
    answer: (
      <>
        <p>
          Absolutely not. The CV we collect from you is a standalone document
          for us to gain a better understanding of your background and
          interests. Rest assured that your grades will not be taken into
          account at all, and our internal team of assessors is also careful to
          balance against any intuitive biases for language ability — which are
          biases that unfairly prejudice against some applicants. We also do not
          accept any referrals from schools or other institutions, so as to
          ensure a fair playing field for all applicants.
        </p>
      </>
    ),
  },
  {
    question:
      "What is the total number of mentee vacancies, and how many students will be selected for the programme?",
    answer: (
      <>
        <p>
          For each of our mentors, they would have indicated the number of
          mentees (between 1-3) they would be willing to take. Based on what the
          mentors have indicated, we would then be able to allocate them the
          relevant number of suitable mentees.
        </p>
      </>
    ),
  },
  {
    question:
      "If I do not have much knowledge or experience in the industry of my selected mentor, does that mean I am less likely to be matched to my choice?",
    answer: (
      <>
        <p>
          We believe in providing equal access to mentorship opportunities to
          all students regardless of their background, so there is no need for
          you to be an expert in your selected field of interest. As the
          rationale for mentorship is for you to learn more about a particular
          industry or about a particular role, what we hope to see in your
          application is a demonstration of your interest in wanting to learn
          from your mentor and their experiences. Your application should also
          reflect concrete learning outcomes that you would like to gain from
          the programme.
        </p>
      </>
    ),
  },
  {
    question: "Am I able to re-submit or modify my existing application?",
    answer: (
      <>
        <p>
          If you had previously submitted a response and would like to re-submit
          a new application, we would appreciate it if you could kindly drop us
          an email at{" "}
          <a href="mailto:mentoring@advisory.sg">mentoring@advisory.sg</a> so
          that we can remove your previous application from our records, before
          you submit your new one. That being said, we would really encourage
          you to consider your choices thoroughly before submitting your
          application, to save yourself the hassle of having to re-submit later
          on.
        </p>
      </>
    ),
  },
  {
    question:
      "Can students based outside of Singapore apply for the programme?",
    answer: (
      <>
        <p>
          Students outside of Singapore can still apply, but unfortunately, you
          must be a) a Singapore Citizen; b) a Singapore Permanent Resident; or
          c) one who has spent a significant amount of time in or has a
          significant connection to Singapore. If you’d like us to bring
          Advisory to your country, do drop us an email at{" "}
          <a href="mailto:contact@advisory.sg">contact@advisory.sg</a>!
        </p>
      </>
    ),
  },
];

const StyledAccordion = styled(Accordion)(() => {
  return {
    border: `1px solid var(--brand-color)`,
    marginBottom: `10px`,
    ".MuiAccordionDetails-root": {},
    ".MuiAccordionSummary-content": {
      marginBottom: `0px`,
    },
  };
});

const StyledQNA = ({
  qna: { question, answer },
  index,
}: {
  qna: QNA;
  index: number;
}) => (
  <StyledAccordion key={index}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
      <Typography>
        <b>{question}</b>
      </Typography>
    </AccordionSummary>
    <AccordionDetails style={{ whiteSpace: "pre-wrap", marginTop: "-20px" }}>
      {answer}
    </AccordionDetails>
  </StyledAccordion>
);

const App = () => {
  return (
    <Canvas>
      <h1>Frequently Asked Questions</h1>
      <h2 style={{ color: "var(--brand-color)" }}>
        Programme Structure and Timeline
      </h2>
      <div className="faq container" style={{ marginBottom: "32px" }}>
        {PROGRAMME_QUESTIONS.map((qna, index) => StyledQNA({ qna, index }))}
      </div>
      <h2 style={{ color: "var(--brand-color)" }}>
        Application Process and Considerations
      </h2>
      <div className="faq container" style={{ marginBottom: "32px" }}>
        {APPLICATION_QUESTIONS.map((qna, index) => StyledQNA({ qna, index }))}
      </div>
    </Canvas>
  );
};

export default App;
