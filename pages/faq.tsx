import React from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useMediaQuery from "@mui/material/useMediaQuery";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

import Header from "../components/Header";

// programme structure and timeline questions
const programmeQuestions = [
  {
    question:
      "How does the programme work and what will be covered in the monthly meetings?",
    answer:
      "The Advisory Mentorship Programme is a four-month structured mentorship programme consisting of a one hour session each month, from June to September 2022. The consistency and timings of meetings would be dependent on the individual availability of mentees and their mentors. In terms of the content covered in each meeting, while we do ultimately leave it to the discretion of the individual mentee-mentor pairs, we have also provided a suggested structure for each month’s session in our Mentee Manual, which is distributed to all confirmed mentees prior to the commencement of the programme. Very briefly, we recommend the first month’s session be used for you and your mentor to set some ground rules and expectations, and to get to know one another better. The second session on “understanding career interests” could be a chance for your mentor to share how they navigated their own career path, so as to provide you with some insights on how to bridge the gap between school and work. The third session on “understanding next steps” consolidates the discussions of the past two sessions. It is a good time for your mentor to offer you some advice on the practical steps you can take post-mentorship to pursue your occupation(s) of interest. The fourth session on “working on next steps” would allow mentors to offer some guidance on how you can proceed from where you are now, to where you want to be. This can be through actionables or tasks, and so on.",
  },
  {
    question:
      "Are there any projects or deliverables to be completed during the period of the mentorship?",
    answer:
      "There are no specific projects per se during the mentorship period, as we recognise that each mentee would be at a different stage of their career exploration journey, and we typically leave that to the discretion of individual mentee-mentor pairs. If selected, you can also let your mentor know if there are additional areas of support you’re looking for, and on a case-by-case basis they will certainly do their best to support you!",
  },
  {
    question: "When will the programme officially commence?",
    answer:
      "The application period for mentees would close on 20 June 2022, while the official launch of the programme would take place mid-end June!",
  },
  {
    question:
      "Would there be possible internship opportunities during/ following the mentorship?",
    answer:
      "Internships are not guaranteed. Our mentors have been made well aware that they are not obliged to provide any internships or other forms of employment to their mentees. Though we have seen very heartening cases of mentors who have helped to arrange internships for their mentes, this should not be an expectation going into the programme, and we ultimately leave it to the individual mentor's discretion as to how they would like to tailor their guidance and support to their mentees.",
  },
  {
    question:
      "Will there be a certificate for mentees at the end of the programme?",
    answer:
      "We have provided a certificate of completion at the end of the programme in both 2020 and 2021, and we are certainly intending to do the same in this year's iteration of the programme.",
  },
  {
    question:
      "Are there 2 waves of mentorship this year similar to last year’s structure and If I apply now, am I applying for one wave or all of them?",
    answer:
      "Unfortunately, we do not currently have plans to carry out more waves of the mentorship programme, so all applications made would only be considered for the current run.",
  },
  {
    question: "Can we continue to meet our mentors beyond the programme?",
    answer:
      "Yes! Mentees are encouraged to stay in contact with their mentors and continue the relationship beyond the programme as long as both parties wish to do so. However, do take note that your contact with your Mentor is no longer affiliated with nor facilitated by Advisory after the duration of the programme, but on the basis of your own independence.",
  },
];

// application process and considerations questions
const applicationQuestions = [
  {
    question:
      "How many mentors am I able to select in my application? What if I do not get matched with any of my choices?",
    answer:
      "In your application, you will be allowed to indicate up to three mentors of your choice, which do not have to come from the same industry. For each of your choices, you will be prompted to share with us in more than 150 words on why you would like to be matched with the particular mentor. For more information on what we look out for in your application, you may refer to our Sample Application Response. In the sign-up form, you will also be prompted to indicate three industries (out of our list of 48) which you are most interested in, as well as to tell us whether you would be open to being matched with a mentor beyond your three choices. In the event that you are not allocated any of your top three mentor choices, should your application be found suitable, you may be allocated a mentor whose industry or fields of expertise match those of your interest.",
  },
  {
    question:
      "What if I am unsure about my industries of interest? Are there any supporting resources to help me make a more informed decision?",
    answer:
      "Most definitely. Our mentorship website contains a link to our list of 48 industries by which we categorise our mentors’ areas of expertise. If you are experiencing any difficulties in deciding on your industries of interest, we would encourage you to take some time to read through the list, and shortlist a couple of industries that you may be most interested in. Following which, you may use the “Industry” search filter function to find possible mentors from your fields of interest.",
  },
  {
    question:
      "Do you have any advice for students who are passionate about a field but not entirely sure whether they will join the industry in the end?",
    answer:
      "We would encourage you to apply either way! One important aspect of mentorship is that you have the opportunity to learn about whether a job or industry is right for you, and we do have mentees who, following the mentorship programme, have decided to embark on other career paths which they had previously not considered. There are many students who are still in their exploratory phases, and it’s perfectly okay to change your mind!",
  },
  {
    question:
      "The application form requires a CV. Are younger students at a disadvantage since their experiences may not be as extensive as older students?",
    answer:
      "The purpose of collecting your CV would really be to give us a sense of who you are, and we have students from across the whole age range getting matched with mentors. The most important aspect of your application would be what you share with us about the mentors you want to be matched with and why - the most compelling answers are genuine, and you don’t have to have the most experience! Many things count as experience - not just formal work experience of achievements, but also free courses you’ve done on the side, things you’ve read, hobbies you have, etc. We encourage everyone to take the leap - you never know if you’ll be the lucky person to get your first choice mentor!",
  },
  {
    question:
      "Can I select a mentor who is in an industry that is not related to the degree I am currently pursuing?",
    answer:
      "Most definitely, we do not impose any restrictions on students’ applications based on their courses of study or subject combinations. As long as the application shows a depth of research into the mentor's profile and clear learning outcomes for the particular mentor, it would certainly be a very strong application.",
  },
  {
    question:
      "What is the total number of mentee vacancies, and how many students will be selected for the programme?",
    answer:
      "For each of our mentors, they would have indicated the number of mentees (between 1-3) they would be willing to take. Based on what the mentors have indicated, we would then be able to allocate them the relevant number of suitable mentees. While we are unable to forecast the total number of mentee positions this year, to give some context, during last year's run of the programme, we had 1,517 mentees who were matched with our 1,264 mentors.",
  },
  {
    question:
      "Other than Advisory’s website, how else should we conduct research on the mentor(s) we are interested in?",
    answer:
      "We would strongly recommend you to do a Google search or look up the mentors you’re interested in online. There is usually a wealth of information available out there, given the success many of them have had in their careers.",
  },
  {
    question:
      "Is there a maximum word count for the section on why we would like to be matched with particular mentors?",
    answer:
      "You would be pleased to know that we do not impose a maximum limit on word count in application responses. Do feel free to share with us any compelling reasons you may have for wanting to receive personalised guidance from a particular mentor. A well-thought out response would certainly help boost your application!",
  },
  {
    question:
      "If we aspire to go to the same school as a chosen mentor who also works in an industry of interest, would that count as a significant and valid basis on which to choose them?",
    answer:
      "Most definitely. Having a mentor who has walked the path that you yourself are considering, both in terms of industry and school, would certainly count as a significant reason. Aside from these specific reasons for wanting to be mentored by them, we would also encourage you to bear in mind the other important aspects in your application and do the due diligence in researching your mentor’s experiences and background.",
  },
  {
    question:
      "Will my academic results or language ability be taken into consideration in my application?",
    answer:
      "Absolutely not. The CV we collect from you is a standalone document for us to gain a better understanding of your background and interests. Rest assured that your grades will not be taken into account at all, and our internal team of assessors is also careful to balance against any intuitive biases for language ability — which are biases that unfairly prejudice against some applicants. We also do not accept any referrals from schools or other institutions, so as to ensure a fair playing field for all applicants.",
  },
  {
    question:
      "If I am currently serving my National Service, am I still eligible to apply for the programme? How can full-time National Servicemen benefit from this program?",
    answer:
      "If you are currently serving your National Service, you are definitely still eligible, and most welcome to apply for the programme. In fact, you will be able to benefit from this programme in the same way anyone else can! National Service is also a very suitable time for you to figure out where you would like to go upon the completion of your service, as well as some of the concrete steps you can take to realise your dreams.",
  },
  {
    question:
      "If I am currently holding a full time job, am I still eligible for the programme?",
    answer:
      "Our sincere apologies - we are only accepting applications from students who aren’t currently employed or holding job offers. This is because these students have less opportunities to engage with working professionals than those currently in the industry, and so we want to save our spots for students! Nevertheless, we would invite you to join us for other programmes - mentorship is just one of the many things we do to support students and young working professionals!",
  },
  {
    question:
      "If I do not have much knowledge or experience in the industry of my selected mentor, does that mean I am less likely to be matched to my choice?",
    answer:
      "We believe in providing equal access to mentorship opportunities to all students regardless of their background, so there is no need for you to be an expert in your selected field of interest. As the rationale for mentorship is for you to learn more about a particular industry or about a particular role, what we hope to see in your application is a demonstration of your interest in wanting to learn from your mentor and their experiences. Your application should also reflect concrete learning outcomes that you would like to gain from the programme.",
  },
  {
    question: "Am I able to re-submit or modify my existing application?",
    answer:
      "If you had previously submitted a response and would like to re-submit a new application, we would appreciate it if you could kindly drop us an email at mentoring@advisory.sg so that we can remove your previous application from our records, before you submit your new one. That being said, we would really encourage you to consider your choices thoroughly before submitting your application, to save yourself the hassle of having to re-submit later on.",
  },
  {
    question:
      "What happens if I do not get my first choice of my mentor, would I be reassigned to another mentor?",
    answer:
      "In the application form, you would have indicated 3 mentor choices, and if your first mentor choice was not selected, we will consider your second and third choice thereafter. The application form would also contain a question on whether you would be open to being paired with a mentor who falls outside all 3 choices in the event that your three choices were not selected. If you have indicated that you are open to a mentor outside of your choices, we will match you with a mentor who is working in the industry which you are interested in.",
  },
  {
    question:
      "Can students based outside of Singapore apply for the programme?",
    answer:
      "Students outside of Singapore can still apply, but unfortunately, you must be a) a Singapore Citizen; b) a Singapore Permanent Resident; or c) one who has spent a significant amount of time in or has a significant connection to Singapore. If you’d like us to bring Advisory to your country, do drop us an email at contact@advisory.sg!",
  },
];

const App = () => {
  const isSmall = useMediaQuery("(max-width: 800px)");
  return (
    <div className="container">
      <Header />
      <div
        className="canvas"
        style={{
          width: isSmall ? "90%" : "80%",
          marginLeft: "auto",
          marginRight: "auto",
          paddingBottom: "20px",
        }}
      >
        <h1>Frequently Asked Questions</h1>
        <h2>Programme Structure and Timeline</h2>
        <div>
          {programmeQuestions.map(({ question, answer }, index) => (
            <Accordion key={index}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>
                  <b>{question}</b>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>

        <h2>Application Process and Considerations</h2>
        <div>
          {applicationQuestions.map(({ question, answer }, index) => (
            <Accordion key={index}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>
                  <b>{question}</b>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
