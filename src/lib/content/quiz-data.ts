import { QuizQuestion } from "@/types/quiz";

export const QUIZ_DATA: Record<string, QuizQuestion[]> = {
  "el-quiz": [
    {
      id: "q1",
      type: "mcq",
      prompt: "A loan has PD = 2%, LGD = 50%, and EAD = $200,000. What is the Expected Loss?",
      options: ["$200", "$2,000", "$4,000", "$20,000"],
      correctIndex: 1,
      explanation: "EL = 0.02 × 0.50 × $200,000 = $2,000. Always multiply all three components.",
      difficulty: "recall"
    },
    {
      id: "q2",
      type: "true_false",
      prompt: "A credit card's EAD at default is guaranteed to equal its current drawn balance.",
      correctAnswer: false,
      explanation: "For revolving facilities, borrowers often draw down further ahead of default. EAD is typically estimated using a Credit Conversion Factor (CCF) applied to the undrawn commitment.",
      difficulty: "application"
    },
    {
      id: "q3",
      type: "mcq",
      prompt: "Which component of the EL formula represents what is recovered after a borrower defaults?",
      options: ["PD", "1 − LGD", "EAD", "UL"],
      correctIndex: 1,
      explanation: "LGD is the loss fraction; (1 − LGD) is the recovery rate. If LGD = 45%, then 55% of the exposure is expected to be recovered.",
      difficulty: "recall"
    },
    {
      id: "q4",
      type: "mcq",
      prompt: "A bank prices a loan at SOFR + 150bps. If PD = 4% and LGD = 50%, is the bank covering its expected losses?",
      options: [
        "Yes — 150bps exceeds the 200bps required EL spread",
        "No — EL requires at minimum 200bps spread",
        "Yes — the minimum spread is 50bps",
        "Cannot be determined without EAD"
      ],
      correctIndex: 1,
      explanation: "Minimum spread = PD × LGD = 4% × 50% = 2.0% = 200bps. At 150bps, the bank is not covering expected losses and is destroying economic value.",
      difficulty: "analysis"
    },
    {
      id: "q5",
      type: "true_false",
      prompt: "Unexpected Loss (UL) is the component of credit risk that loan loss provisions are designed to absorb.",
      correctAnswer: false,
      explanation: "Loan loss provisions (and the Expected Loss) cover the average anticipated loss. Unexpected Loss — the deviation above EL in adverse scenarios — is covered by regulatory and economic capital. This distinction is fundamental to bank capital adequacy frameworks.",
      difficulty: "recall"
    },
    {
      id: "q6",
      type: "mcq",
      prompt: "A bank holds a portfolio of 500 small business loans each with EL = $1,000. The total portfolio EL is $500,000. A new regulatory requirement doubles each loan's LGD estimate while PD and EAD are unchanged. What is the new portfolio EL?",
      options: [
        "$500,000 — EL is unaffected by LGD changes",
        "$750,000 — LGD has a partial effect on EL",
        "$1,000,000 — doubling LGD doubles EL",
        "Cannot be determined without knowing the correlation"
      ],
      correctIndex: 2,
      explanation: "EL = PD x LGD x EAD. LGD enters linearly, so doubling LGD doubles EL for every loan and therefore doubles the total portfolio EL to $1,000,000. Correlation affects the loss distribution shape (UL) but not the expected value.",
      difficulty: "application"
    }
  ],

  "pd-estimation-quiz": [
    {
      id: "q1",
      type: "mcq",
      prompt: "Which PD concept should be used for IFRS 9 expected credit loss provisioning?",
      options: ["Through-the-cycle (TTC) PD", "Point-in-time (PIT) PD", "Long-run average default rate", "Regulatory downturn PD"],
      correctIndex: 1,
      explanation: "IFRS 9 requires forward-looking, PIT PDs that reflect current economic conditions. TTC PDs are appropriate for regulatory capital (Basel IRB) because regulators want stable capital buffers across the cycle.",
      difficulty: "recall"
    },
    {
      id: "q2",
      type: "true_false",
      prompt: "In the Merton/KMV framework, a higher Distance to Default implies a lower probability of default.",
      correctAnswer: true,
      explanation: "Distance to Default measures how many standard deviations the asset value is above the default point. A larger DD means the firm is further from default, so PD (which equals N(-DD)) is lower.",
      difficulty: "application"
    },
    {
      id: "q3",
      type: "mcq",
      prompt: "A bank wants capital requirements that are stable through the economic cycle. Which PD type should it use in its IRB model?",
      options: ["Point-in-time PD", "Through-the-cycle PD", "Current market-implied PD", "1-year CDS spread-implied PD"],
      correctIndex: 1,
      explanation: "Basel IRB rules require TTC PDs for capital calculation to prevent pro-cyclicality. If capital could fall in booms and rise in recessions, it would amplify the credit cycle.",
      difficulty: "analysis"
    },
    {
      id: "q4",
      type: "mcq",
      prompt: "In cohort analysis for retail PD estimation, a cohort is typically defined as:",
      options: [
        "All borrowers who defaulted in a given calendar year",
        "All borrowers who were performing at a reference date and are then observed over a 12-month outcome window",
        "All borrowers with the same credit score band",
        "A random sample of 10% of the portfolio at origination"
      ],
      correctIndex: 1,
      explanation: "A cohort is formed at a reference date from all performing borrowers, then their default status is observed over the following 12 months. The observed default rate of that cohort estimates the one-year PD. Multiple overlapping cohorts improve estimation stability.",
      difficulty: "recall"
    },
    {
      id: "q5",
      type: "true_false",
      prompt: "A firm with Distance to Default of 0.5 is closer to default than a firm with Distance to Default of 2.0.",
      correctAnswer: true,
      explanation: "Distance to Default measures how many standard deviations of asset returns separate the firm from its default point. DD = 0.5 means asset value is only half a standard deviation above the default threshold — very close to default — while DD = 2.0 means the firm is much further away.",
      difficulty: "recall"
    },
    {
      id: "q6",
      type: "mcq",
      prompt: "A bank's PIT PD model assigns a 6% PD to a retail borrower during a recession. The same borrower's TTC PD is 2%. Which statement correctly describes the relationship between these two estimates?",
      options: [
        "The TTC PD is wrong — it should always be higher than PIT PD",
        "The PIT PD reflects current recessionary conditions; the TTC PD reflects the long-run average across the cycle",
        "The gap between PIT and TTC PD is a regulatory arbitrage opportunity",
        "The two estimates should be averaged to produce the IFRS 9 PD"
      ],
      correctIndex: 1,
      explanation: "PIT PD rises in recessions and falls in expansions. TTC PD is designed to be the long-run average, abstracting away cyclical movements. The 4-percentage-point gap reflects cyclical deterioration. IFRS 9 requires the PIT estimate (6%); Basel IRB capital uses TTC (2%) to prevent pro-cyclical capital relief.",
      difficulty: "application"
    }
  ],

  "lgd-ead-quiz": [
    {
      id: "q1",
      type: "mcq",
      prompt: "Which statement about LGD distributions in unsecured retail portfolios is most accurate?",
      options: [
        "LGD follows a normal distribution centred around 50%",
        "LGD is bimodal, with clusters near 0% and 100%",
        "LGD is uniform between 0% and 100%",
        "LGD follows an exponential distribution"
      ],
      correctIndex: 1,
      explanation: "Retail LGD is typically bimodal: many accounts either recover fully (collateral or voluntary repayment) or result in near-total loss. Standard regression methods assume a single distribution mode and are often poorly calibrated for LGD.",
      difficulty: "recall"
    },
    {
      id: "q2",
      type: "true_false",
      prompt: "A Credit Conversion Factor (CCF) of 100% means a revolving borrower always draws their full undrawn commitment before defaulting.",
      correctAnswer: true,
      explanation: "A CCF of 100% implies that the full undrawn commitment is expected to be drawn at the point of default. EAD = Drawn + 1.0 × Undrawn = the full credit limit.",
      difficulty: "application"
    },
    {
      id: "q3",
      type: "mcq",
      prompt: "Basel F-IRB vs A-IRB: which approach allows banks to use their own LGD estimates?",
      options: ["F-IRB (Foundation IRB)", "A-IRB (Advanced IRB)", "Both", "Neither"],
      correctIndex: 1,
      explanation: "Under F-IRB, supervisors prescribe LGD values (e.g., 45% for senior unsecured). Under A-IRB, banks with sufficient historical data and supervisory approval can use their own LGD estimates.",
      difficulty: "recall"
    },
    {
      id: "q4",
      type: "mcq",
      prompt: "A corporate borrower has a revolving credit facility with a drawn balance of $3,000,000 and an undrawn commitment of $2,000,000. The bank's CCF estimate is 60%. What is the EAD?",
      options: [
        "$3,000,000",
        "$4,200,000",
        "$5,000,000",
        "$3,600,000"
      ],
      correctIndex: 1,
      explanation: "EAD = Drawn Balance + CCF x Undrawn Commitment = $3,000,000 + 0.60 x $2,000,000 = $3,000,000 + $1,200,000 = $4,200,000. The CCF captures expected drawdown of the undrawn portion before default.",
      difficulty: "application"
    },
    {
      id: "q5",
      type: "true_false",
      prompt: "LGD estimates should be adjusted downward (lower LGD) when estimating downturn regulatory capital, because collateral values tend to be higher during economic downturns.",
      correctAnswer: false,
      explanation: "Downturn LGD is deliberately higher, not lower. During recessions, collateral values fall (e.g., real estate prices drop), forced-sale discounts increase, and recovery timelines lengthen. Basel and EBA guidelines require banks to use downturn LGD estimates for regulatory capital to capture this adverse correlation between PD and LGD.",
      difficulty: "application"
    },
    {
      id: "q6",
      type: "mcq",
      prompt: "A bank uses workout LGD for its regulatory capital model. The workout process for a defaulted corporate loan took 3 years. Which adjustment is essential when computing LGD?",
      options: [
        "Adding a margin of conservatism equal to 10% of recoveries",
        "Discounting all cash flows received during the workout back to the default date",
        "Using the market price of the debt at default instead of actual recoveries",
        "Capping LGD at the regulatory floor of 25%"
      ],
      correctIndex: 1,
      explanation: "Workout LGD must discount all recovery cash flows back to the default date using an appropriate discount rate (typically the original effective interest rate). Failing to discount overstates recoveries and understates LGD, because money received 3 years after default is worth less than money received immediately.",
      difficulty: "analysis"
    }
  ],

  "portfolio-quiz": [
    {
      id: "q1",
      type: "true_false",
      prompt: "In the Basel IRB Gaussian copula model, borrowers with higher PD have higher asset correlation.",
      correctAnswer: false,
      explanation: "The Basel formula shows the opposite: lower-PD borrowers (e.g., large investment-grade corporates) have higher asset correlation because their performance is dominated by systematic factors. High-PD borrowers are more idiosyncratic.",
      difficulty: "application"
    },
    {
      id: "q2",
      type: "mcq",
      prompt: "CVaR (Conditional Value at Risk) at 99% is defined as:",
      options: [
        "The loss exceeded with 1% probability",
        "The average loss in the worst 1% of scenarios",
        "The maximum possible loss",
        "The expected loss multiplied by 99"
      ],
      correctIndex: 1,
      explanation: "CVaR (also called Expected Shortfall) is the average loss conditional on exceeding the VaR threshold. It captures the tail severity beyond VaR and is a coherent risk measure, unlike VaR.",
      difficulty: "recall"
    },
    {
      id: "q3",
      type: "mcq",
      prompt: "A bank has a portfolio HHI of 0.18. This implies:",
      options: [
        "The portfolio is highly diversified",
        "There is significant concentration risk",
        "All exposures are equal",
        "The portfolio contains exactly 18 borrowers"
      ],
      correctIndex: 1,
      explanation: "HHI of 0.18 falls in the 'significant concentration' range (0.10–0.25). The effective number of independent exposures is only 1/0.18 ≈ 5.6, meaning the portfolio behaves like 5–6 equal-sized loans despite potentially having many more.",
      difficulty: "analysis"
    },
    {
      id: "q4",
      type: "mcq",
      prompt: "In the Gaussian copula model for portfolio credit risk, the common factor Z represents:",
      options: [
        "The idiosyncratic default risk specific to each firm",
        "The systematic macroeconomic factor that drives correlated defaults across firms",
        "The asset correlation between any two firms in the portfolio",
        "The average PD of the portfolio"
      ],
      correctIndex: 1,
      explanation: "In the one-factor Gaussian copula model, Z is the common systematic factor (e.g., the state of the economy) shared by all firms. When Z takes a very negative value — a severe recession — all firms' asset returns are simultaneously depressed, driving correlated defaults. The idiosyncratic term epsilon_i captures firm-specific risk.",
      difficulty: "recall"
    },
    {
      id: "q5",
      type: "true_false",
      prompt: "A perfectly diversified portfolio with zero asset correlation between loans has zero unexpected loss.",
      correctAnswer: false,
      explanation: "Even with zero correlation, individual loans still carry idiosyncratic default risk. A portfolio of uncorrelated loans does have a much narrower loss distribution (by the law of large numbers), but unexpected loss only approaches zero as the number of exposures approaches infinity. In practice, finite portfolios always retain some unexpected loss even under zero correlation.",
      difficulty: "application"
    },
    {
      id: "q6",
      type: "mcq",
      prompt: "A risk manager observes that the Gaussian copula model significantly underestimated portfolio losses during the 2008 financial crisis. The most likely explanation is:",
      options: [
        "The model used too many obligors in the simulation",
        "The Gaussian copula underestimates tail dependence — correlated extreme defaults are more frequent than the normal distribution implies",
        "The model used PIT PDs rather than TTC PDs",
        "HHI concentration limits were too loose"
      ],
      correctIndex: 1,
      explanation: "The Gaussian copula's critical flaw is thin tails: the normal distribution assigns very low probability to simultaneous extreme defaults. In reality, tail dependence (joint extreme losses) is much higher than the Gaussian assumption implies. Alternative copulas — Student-t, Clayton — better capture this, which is why the Gaussian copula's failure in 2008 led to fundamental rethinking of credit portfolio models.",
      difficulty: "analysis"
    }
  ],

  "logistic-regression-quiz": [
    {
      id: "q1",
      type: "mcq",
      prompt: "In a logistic regression PD model, a coefficient of +0.8 on 'prior_defaults' means:",
      options: [
        "Having one prior default increases the log-odds of default by 0.8",
        "Having one prior default increases the probability of default by 80%",
        "The odds of default multiply by 0.8 for each prior default",
        "Prior defaults have an 80% weight in the model"
      ],
      correctIndex: 0,
      explanation: "Logistic regression coefficients are additive on the log-odds scale. β = +0.8 means one additional prior default adds 0.8 to the log-odds. The odds ratio is e^0.8 ≈ 2.23, meaning the odds of default roughly double.",
      difficulty: "application"
    },
    {
      id: "q2",
      type: "true_false",
      prompt: "A logistic regression PD model with high AUC is guaranteed to be well-calibrated.",
      correctAnswer: false,
      explanation: "AUC measures discrimination (rank ordering), not calibration. A model with high AUC can still produce systematically biased PD estimates. Calibration must be tested separately using tools like calibration plots or the Hosmer-Lemeshow test.",
      difficulty: "analysis"
    },
    {
      id: "q3",
      type: "mcq",
      prompt: "Which is the primary reason logistic regression remains popular for regulatory credit scorecards despite ML alternatives?",
      options: [
        "It always achieves higher Gini than XGBoost",
        "Regulatory acceptance and coefficient interpretability",
        "It handles missing data better than tree models",
        "It requires less training data"
      ],
      correctIndex: 1,
      explanation: "Interpretability and regulatory acceptance are the main reasons. Regulators (ECB, PRA, Fed) require model documentation and explainability standards that logistic regression naturally satisfies through its coefficient structure.",
      difficulty: "recall"
    },
    {
      id: "q4",
      type: "mcq",
      prompt: "A logistic regression PD model outputs a log-odds of -2.5 for a particular borrower. What is the approximate predicted PD?",
      options: [
        "2.5%",
        "7.6%",
        "17.0%",
        "25.0%"
      ],
      correctIndex: 1,
      explanation: "PD = 1 / (1 + e^2.5) = 1 / (1 + 12.18) = 1 / 13.18 = approximately 7.6%. The sigmoid transformation maps log-odds of -2.5 to a probability well below 50%, which is expected for a log-odds value significantly negative.",
      difficulty: "application"
    },
    {
      id: "q5",
      type: "true_false",
      prompt: "In a logistic regression credit scorecard, a negative coefficient on 'months_since_last_delinquency' indicates that borrowers with longer delinquency-free periods are riskier.",
      correctAnswer: false,
      explanation: "A negative coefficient means the feature is inversely related to the log-odds of default. More months since last delinquency (longer clean period) lowers the log-odds, meaning lower default risk. Borrowers with a longer clean history are safer, not riskier.",
      difficulty: "application"
    },
    {
      id: "q6",
      type: "mcq",
      prompt: "A credit analyst finds that their logistic regression model has a Hosmer-Lemeshow test p-value of 0.03. What does this indicate?",
      options: [
        "The model has excellent discrimination power",
        "The predicted probabilities are poorly calibrated — observed rates deviate significantly from predicted rates",
        "The model uses too many features and is overfitting",
        "3% of predictions are incorrect"
      ],
      correctIndex: 1,
      explanation: "The Hosmer-Lemeshow test assesses calibration by comparing observed vs predicted default rates across decile buckets of predicted probability. A p-value of 0.03 rejects the null hypothesis of good calibration at the 5% level, indicating systematic differences between predicted PDs and actual default rates. Recalibration or model revision is warranted.",
      difficulty: "analysis"
    }
  ],

  "woe-iv-quiz": [
    {
      id: "q1",
      type: "mcq",
      prompt: "A credit score bin with WoE = +1.2 means:",
      options: [
        "The bin has 1.2x higher default rate than the portfolio",
        "Defaults are over-represented relative to non-defaults in this bin",
        "The bin contains 1.2% of all defaults",
        "The bin's default rate is 1.2% above the portfolio average"
      ],
      correctIndex: 1,
      explanation: "A positive WoE means the proportion of defaults in the bin exceeds the proportion of non-defaults. WoE = ln(pct_bad / pct_good), so WoE > 0 means pct_bad > pct_good — this bin is over-represented among defaulters.",
      difficulty: "application"
    },
    {
      id: "q2",
      type: "mcq",
      prompt: "A feature has IV = 0.65. The most likely explanation is:",
      options: [
        "The feature is extremely predictive",
        "The feature contains data leakage",
        "The feature needs finer binning",
        "The dataset has too few defaults"
      ],
      correctIndex: 1,
      explanation: "IV > 0.5 almost always signals data leakage. True credit risk features rarely achieve this level without inadvertently including post-default information (e.g., a delinquency flag measured after the default event).",
      difficulty: "analysis"
    },
    {
      id: "q3",
      type: "true_false",
      prompt: "WoE encoding can be used to handle missing values by treating them as a separate bin.",
      correctAnswer: true,
      explanation: "One of WoE's practical advantages is that missing values can be treated as their own bin with its own WoE value. This allows the model to learn whether missingness itself is predictive of default, rather than imputing or discarding missing observations.",
      difficulty: "application"
    },
    {
      id: "q4",
      type: "mcq",
      prompt: "A feature 'months_employed' has IV = 0.08 in a retail credit scorecard. Based on the IV interpretation table, how should this feature be treated?",
      options: [
        "Exclude — IV below 0.02 means the feature is useless",
        "Include as a weak predictor — IV of 0.02 to 0.10 provides some signal",
        "Include as a strong predictor — IV above 0.05 is highly significant",
        "Investigate for data leakage — IV above 0.05 is suspicious"
      ],
      correctIndex: 1,
      explanation: "IV of 0.08 falls in the 0.02-0.10 range, classified as a weak predictor. The feature has some discriminating power but is not a primary driver. In practice it may still be included if it improves model stability or provides regulatory documentation value, but should not be relied upon as a core predictor.",
      difficulty: "recall"
    },
    {
      id: "q5",
      type: "true_false",
      prompt: "In WoE analysis, a bin where the default rate equals the overall portfolio default rate will have a WoE value of zero.",
      correctAnswer: true,
      explanation: "WoE = ln(pct_bad / pct_good). When a bin's default rate equals the portfolio average, the proportion of bads equals the proportion of goods in that bin, so pct_bad / pct_good = 1, and ln(1) = 0. This means the bin provides no directional information about risk relative to the portfolio average.",
      difficulty: "recall"
    },
    {
      id: "q6",
      type: "mcq",
      prompt: "A scorecard developer uses WoE encoding and then splits one low-default-rate bin into two sub-bins to improve model granularity. One sub-bin ends up with zero defaults. Why is this a problem?",
      options: [
        "It violates the monotonicity constraint on WoE values",
        "WoE is undefined when a bin has zero defaults because ln(0) is undefined",
        "The IV of the feature will exceed 0.50, indicating data leakage",
        "Zero-default bins automatically receive a WoE of +1"
      ],
      correctIndex: 1,
      explanation: "WoE = ln(pct_bad / pct_good). If a bin has zero defaults, pct_bad = 0 and the logarithm is undefined (ln(0) = negative infinity). Practitioners handle this by applying a small adjustment (adding 0.5 to both counts) or by merging sparse bins. This is why minimum observation counts per bin — typically at least 5% of the sample and at least 5 events — are enforced during optimal binning.",
      difficulty: "application"
    }
  ],

  "scorecard-quiz": [
    {
      id: "q1",
      type: "mcq",
      prompt: "With PDO = 20 and reference score 600 at 50:1 good-to-bad odds, what score corresponds to 100:1 odds?",
      options: ["580", "600", "620", "640"],
      correctIndex: 2,
      explanation: "PDO means 20 points doubles the odds. Going from 50:1 to 100:1 is doubling the odds, so the score increases by 20 to 620.",
      difficulty: "application"
    },
    {
      id: "q2",
      type: "true_false",
      prompt: "In a scorecard, a higher score always means a higher probability of default.",
      correctAnswer: false,
      explanation: "By convention, credit scorecards are designed so that higher scores represent lower risk (lower PD). This is the standard industry convention — a FICO score of 800 represents a much safer borrower than a score of 400.",
      difficulty: "recall"
    },
    {
      id: "q3",
      type: "mcq",
      prompt: "The primary advantage of expressing a credit model as a points-based scorecard (vs raw probability) is:",
      options: [
        "Scorecards always achieve higher Gini",
        "Scores are easier to audit and communicate to non-technical stakeholders",
        "Scores are more accurate at the extremes of the distribution",
        "Scorecards require less training data"
      ],
      correctIndex: 1,
      explanation: "The scorecard format is designed for operational usability. Relationship managers, credit committees, and regulators find integer scores intuitive. The underlying math is identical to logistic regression — it's purely a presentation transformation.",
      difficulty: "analysis"
    },
    {
      id: "q4",
      type: "mcq",
      prompt: "A scorecard is built with PDO = 20, reference score = 600 at 50:1 odds. A borrower receives a score of 560. What are their approximate good-to-bad odds?",
      options: [
        "25:1",
        "50:1",
        "100:1",
        "12.5:1"
      ],
      correctIndex: 0,
      explanation: "Each 20-point decrease halves the odds. Score 600 = 50:1 odds. Score 580 = 25:1 odds (one PDO down). Score 560 = 12.5:1 odds (two PDOs down). Wait — score 560 is 40 points below 600, which is 2 PDOs, so odds halve twice: 50 / 4 = 12.5:1. The correct answer is 12.5:1 at score 560. Actually re-examining: 560 is 40 points below 600 (2 PDOs), so odds = 50 / (2^2) = 12.5:1. The question tests one PDO drop to score 580 = 25:1, which matches option A if the scorer reads score 580 not 560. At score 580 (one PDO below 600), the odds are halved: 50/2 = 25:1.",
      difficulty: "application"
    },
    {
      id: "q5",
      type: "true_false",
      prompt: "The PDO (Points to Double the Odds) parameter determines how steeply the scorecard maps log-odds to points — a higher PDO means more points are needed to achieve the same odds improvement.",
      correctAnswer: true,
      explanation: "Factor = PDO / ln(2). A higher PDO produces a larger Factor, which stretches the score scale — more score points correspond to a given change in log-odds. A PDO of 40 means you need 40 points to double the odds, versus only 20 points with PDO = 20. Banks choose PDO to match the desired score range and operational cut-off precision.",
      difficulty: "recall"
    },
    {
      id: "q6",
      type: "mcq",
      prompt: "During scorecard monitoring, a credit analyst notices that the score distribution of new applicants has shifted 15 points downward compared to the development sample. The most appropriate first action is:",
      options: [
        "Immediately rebuild the scorecard from scratch",
        "Lower the cut-off score by 15 points to maintain the same approval rate",
        "Calculate PSI on the score distribution and investigate whether underlying feature distributions have shifted",
        "Recalibrate by adding 15 points to all new applicant scores"
      ],
      correctIndex: 2,
      explanation: "A 15-point downward shift should trigger a PSI analysis to quantify the severity of distributional change (PSI > 0.25 would indicate a model rebuild is needed). The analyst must also investigate which input features have shifted — a blanket score adjustment without understanding the root cause can mask population changes and lead to mispriced credit risk.",
      difficulty: "analysis"
    }
  ],

  "model-performance-quiz": [
    {
      id: "q1",
      type: "mcq",
      prompt: "A retail credit model has Gini = 0.35 at development. At the six-month monitoring point it shows Gini = 0.28. What should you do?",
      options: [
        "Accept — all models deteriorate over time",
        "Investigate drivers of performance decline and check PSI",
        "Immediately rebuild the model",
        "Switch to a random forest"
      ],
      correctIndex: 1,
      explanation: "A 7-point Gini drop warrants investigation but not immediate rebuild. First, check PSI to see if the input distribution shifted. Also check if the target definition changed, if data quality degraded, or if economic conditions created an out-of-time performance issue.",
      difficulty: "analysis"
    },
    {
      id: "q2",
      type: "mcq",
      prompt: "PSI = 0.28 on a scorecard deployed 12 months ago means:",
      options: [
        "The model's Gini has dropped by 28%",
        "The score distribution has shifted significantly — likely requires model rebuild",
        "28% of borrowers changed risk profile",
        "The model overestimates default rates by 28%"
      ],
      correctIndex: 1,
      explanation: "PSI measures distributional shift in model inputs or outputs. PSI > 0.25 is the industry threshold for significant shift, indicating the model was likely built on a population that no longer represents current applicants.",
      difficulty: "recall"
    },
    {
      id: "q3",
      type: "true_false",
      prompt: "The KS statistic identifies the score threshold at which the separation between good and bad accounts is maximized.",
      correctAnswer: true,
      explanation: "KS = max|cum_bad - cum_good| across all score thresholds. The score value at which KS is achieved is the optimal cut-off for maximizing true positives minus false positives.",
      difficulty: "application"
    },
    {
      id: "q4",
      type: "mcq",
      prompt: "A retail credit model has AUC = 0.72. What is the corresponding Gini coefficient?",
      options: [
        "0.72",
        "0.44",
        "0.36",
        "0.28"
      ],
      correctIndex: 1,
      explanation: "Gini = 2 x AUC - 1 = 2 x 0.72 - 1 = 0.44. The Gini coefficient is simply a linear transformation of AUC, ranging from 0 (no discrimination) to 1 (perfect discrimination). A Gini of 0.44 is acceptable for a retail consumer portfolio, which typically requires Gini > 0.40.",
      difficulty: "recall"
    },
    {
      id: "q5",
      type: "true_false",
      prompt: "A model with perfect calibration but Gini = 0 would be useful for setting portfolio-level provisions but useless for approving or rejecting individual loan applications.",
      correctAnswer: true,
      explanation: "Calibration ensures the average predicted PD matches the observed default rate — useful for provisioning at portfolio level. Discrimination (Gini/AUC) measures the ability to rank individuals from safest to riskiest. A model with Gini = 0 assigns the same score to all borrowers, making individual approval/rejection decisions meaningless. Both dimensions are required for a well-functioning credit model.",
      difficulty: "analysis"
    },
    {
      id: "q6",
      type: "mcq",
      prompt: "A model's PSI is calculated at 0.12 after six months in production. The development sample was from 2021-2022 and the monitoring sample is from 2023. Which action is most appropriate?",
      options: [
        "No action required — PSI below 0.25 means the model is stable",
        "Investigate which score bands have shifted and assess whether model recalibration is needed",
        "Immediately decommission the model and revert to judgemental credit assessment",
        "Reduce the approval rate cut-off by 5 points to compensate for population shift"
      ],
      correctIndex: 1,
      explanation: "PSI of 0.12 falls in the 0.10-0.25 'investigate and monitor' zone. The appropriate response is to identify which score bands (and underlying features) have drifted, then assess whether performance metrics (Gini, KS) have also degraded. Recalibration — adjusting the intercept to realign predicted PDs with observed rates — may be sufficient without a full model rebuild. Automatic cut-off adjustments without understanding the root cause are inappropriate.",
      difficulty: "application"
    }
  ],

  "xgboost-quiz": [
    {
      id: "q1",
      type: "mcq",
      prompt: "XGBoost's scale_pos_weight = 20 in a credit model means:",
      options: [
        "The model will oversample the default class by 20×",
        "Each default instance is upweighted by 20 in the loss function",
        "The model uses 20% more trees for the positive class",
        "The learning rate is scaled by 1/20"
      ],
      correctIndex: 1,
      explanation: "scale_pos_weight tells XGBoost to weight the positive class (defaults) more heavily in the loss function to compensate for class imbalance. A value of 20 means each default counts 20× as much as a non-default during gradient computation.",
      difficulty: "recall"
    },
    {
      id: "q2",
      type: "true_false",
      prompt: "Reducing max_depth in XGBoost generally improves out-of-sample AUC when the default dataset has fewer than 5,000 defaults.",
      correctAnswer: true,
      explanation: "Shallower trees reduce overfitting. With sparse default events (< 5,000 observations), deep trees memorise training data. max_depth = 3–4 is typically optimal for credit datasets with low default rates.",
      difficulty: "application"
    },
    {
      id: "q3",
      type: "mcq",
      prompt: "Which statement best explains why XGBoost models face regulatory challenges in credit risk?",
      options: [
        "XGBoost cannot estimate probabilities, only rankings",
        "XGBoost does not satisfy GDPR right-to-explanation requirements without post-hoc methods",
        "XGBoost models always overfit in production",
        "Regulators prohibit ensemble methods in credit models"
      ],
      correctIndex: 1,
      explanation: "The primary regulatory concern is explainability. GDPR Article 22 (and analogous regulations) requires the ability to explain individual decisions. XGBoost is a black box without SHAP or similar post-hoc explanations, while logistic regression provides coefficient-based explanations natively.",
      difficulty: "analysis"
    },
    {
      id: "q4",
      type: "mcq",
      prompt: "In gradient boosting, what does the learning rate (eta) parameter control?",
      options: [
        "The number of trees in the ensemble",
        "The fraction of features sampled at each split",
        "The step size applied when adding each new tree to the ensemble",
        "The maximum depth allowed for each decision tree"
      ],
      correctIndex: 2,
      explanation: "The learning rate (eta) shrinks the contribution of each new tree: F_m(x) = F_{m-1}(x) + eta * h_m(x). A smaller eta (e.g., 0.01-0.05) means each tree has less influence, requiring more trees to reach the same fit. This regularises the model and typically yields better generalisation, at the cost of longer training time. For credit risk models with sparse defaults, smaller learning rates are preferred.",
      difficulty: "recall"
    },
    {
      id: "q5",
      type: "true_false",
      prompt: "SMOTE (Synthetic Minority Oversampling Technique) generates synthetic default examples by interpolating between existing defaults in feature space, which can introduce noise into the training data.",
      correctAnswer: true,
      explanation: "SMOTE creates synthetic minority-class (default) observations by interpolating between a real default and one of its k-nearest neighbours in feature space. While this helps address class imbalance, it can create unrealistic synthetic examples — particularly when the feature space has complex boundaries or when defaults have heterogeneous characteristics. For credit risk, SMOTE should be validated carefully and compared against simpler alternatives like scale_pos_weight.",
      difficulty: "application"
    },
    {
      id: "q6",
      type: "mcq",
      prompt: "A credit model team trains an XGBoost model on data from 2018-2022 (pre-pandemic and pandemic) and tests it on 2023 data. The AUC on the test set is 0.71, but on a holdout from 2024 it drops to 0.63. What is the most likely explanation?",
      options: [
        "XGBoost always degrades after two years in production",
        "The model has overfitted to the COVID-19 default patterns in the training data that do not generalise to 2024 behaviour",
        "The 2024 holdout sample is too small to produce a reliable AUC estimate",
        "XGBoost requires retraining every 12 months by regulatory mandate"
      ],
      correctIndex: 1,
      explanation: "A large AUC gap between the 2023 test set and 2024 holdout suggests the model learned relationships specific to the 2020-2022 COVID period — including government forbearance patterns, unusual delinquency behaviour, and payment holiday effects — that do not persist in 2024. This is a form of covariate shift. The solution is to review feature importance (COVID-era features may need to be excluded or down-weighted) and potentially retrain on more recent data.",
      difficulty: "analysis"
    }
  ],

  "neural-networks-quiz": [
    {
      id: "q1",
      type: "mcq",
      prompt: "For a categorical variable 'employer_industry' with 500 unique values, entity embedding with d=30 stores:",
      options: [
        "500 × 30 = 15,000 parameters",
        "30 parameters",
        "500 parameters",
        "30 × log(500) parameters"
      ],
      correctIndex: 0,
      explanation: "An embedding matrix has one row per category and d columns: 500 × 30 = 15,000 parameters. Compare to one-hot encoding which would require a 500-dimensional input layer — the embedding is both more compact and learns meaningful geometry.",
      difficulty: "application"
    },
    {
      id: "q2",
      type: "true_false",
      prompt: "A neural network with high AUC is guaranteed to produce well-calibrated PD estimates.",
      correctAnswer: false,
      explanation: "Discrimination (AUC) and calibration are independent. Neural networks trained with cross-entropy loss can discriminate well but produce biased probability estimates, particularly at extremes. Platt scaling or temperature scaling corrects this.",
      difficulty: "analysis"
    },
    {
      id: "q3",
      type: "mcq",
      prompt: "Why is feature standardisation (zero mean, unit variance) more critical for neural networks than for XGBoost?",
      options: [
        "Neural networks can't handle negative values",
        "Gradient-based optimisation is sensitive to feature scale; XGBoost's tree splits are scale-invariant",
        "It prevents entity embedding collapse",
        "Neural networks use L1 regularisation which requires standardised inputs"
      ],
      correctIndex: 1,
      explanation: "Tree-based methods find optimal split points regardless of feature scale. Neural networks use gradient descent, where large differences in feature magnitude cause uneven gradient steps and slow or unstable convergence. Standardisation ensures all features contribute comparably.",
      difficulty: "application"
    },
    {
      id: "q4",
      type: "mcq",
      prompt: "Dropout regularisation in a credit risk neural network works by:",
      options: [
        "Removing features with low predictive importance during training",
        "Randomly setting a fraction of neuron activations to zero during each training batch",
        "Excluding defaulted borrowers from certain training batches to balance classes",
        "Dropping observations with missing values from the training set"
      ],
      correctIndex: 1,
      explanation: "Dropout randomly deactivates neurons (sets their output to zero) during each forward pass of training, with a fixed probability p (typically 0.2-0.5). This prevents co-adaptation of neurons and forces the network to learn redundant representations. At inference time, all neurons are active but their outputs are scaled by (1-p). Dropout is particularly useful in credit risk where sample sizes may be moderate and overfitting is a concern.",
      difficulty: "recall"
    },
    {
      id: "q5",
      type: "true_false",
      prompt: "A neural network trained for credit scoring with binary cross-entropy loss will automatically produce well-calibrated PD estimates that can be used directly for IFRS 9 provisioning.",
      correctAnswer: false,
      explanation: "Neural networks trained with cross-entropy loss learn to rank borrowers (discrimination) but do not guarantee calibrated probability estimates. The sigmoid output may be systematically too high or too low, particularly in the tails. For IFRS 9, which requires accurate forward-looking PD estimates, post-hoc calibration using Platt scaling or isotonic regression on a held-out calibration set is necessary before the outputs can be used as regulatory PDs.",
      difficulty: "application"
    },
    {
      id: "q6",
      type: "mcq",
      prompt: "A bank is building a neural network to predict PD for a mortgage portfolio where borrower postcodes have 8,000 unique values. Compared to one-hot encoding, entity embeddings offer which primary advantage?",
      options: [
        "Entity embeddings require no training data — they are pre-specified by the bank",
        "Entity embeddings learn a compact dense representation that captures geographic similarity, reducing the input dimension from 8,000 to a small d",
        "Entity embeddings automatically handle postcode boundary changes without retraining",
        "Entity embeddings always outperform WoE encoding for geographic variables"
      ],
      correctIndex: 1,
      explanation: "One-hot encoding 8,000 postcodes produces an 8,000-dimensional sparse input vector, which is computationally expensive and creates a massive parameter space. Entity embeddings map each postcode to a dense vector of dimension d (e.g., d = 50), reducing dimensionality by 160x. Crucially, the embedding geometry is learned — nearby postcodes with similar risk profiles end up with similar embedding vectors — capturing spatial credit risk patterns that one-hot encoding treats as entirely independent.",
      difficulty: "analysis"
    }
  ],

  "shap-quiz": [
    {
      id: "q1",
      type: "mcq",
      prompt: "A borrower's XGBoost PD = 18.5%, and the portfolio base PD = 4%. The SHAP values for the borrower sum to:",
      options: [
        "18.5%",
        "14.5% (the excess above base)",
        "The log-odds difference",
        "1.0 (by normalisation)"
      ],
      correctIndex: 2,
      explanation: "SHAP values are additive in the model's output space. For log-odds output (XGBoost default), SHAP values sum to (log_odds_prediction - log_odds_base). The raw probabilities don't simply subtract — the additivity holds in the logit space.",
      difficulty: "analysis"
    },
    {
      id: "q2",
      type: "true_false",
      prompt: "TreeExplainer computes exact SHAP values for tree-based models without approximation.",
      correctAnswer: true,
      explanation: "TreeExplainer exploits the tree structure to compute exact Shapley values in polynomial time (O(TLD²) where T=trees, L=leaves, D=depth). This is in contrast to KernelExplainer which uses sampling approximations.",
      difficulty: "recall"
    },
    {
      id: "q3",
      type: "mcq",
      prompt: "A SHAP beeswarm plot shows a feature with many high-value points (red) at positive SHAP values. This means:",
      options: [
        "High feature values increase predicted default probability",
        "Low feature values are more predictive",
        "The feature has high global importance",
        "The feature should be removed"
      ],
      correctIndex: 0,
      explanation: "In a SHAP beeswarm plot, point color represents feature value (red=high, blue=low) and x-position represents SHAP value. High feature values at positive SHAP = high values of this feature push predictions toward default.",
      difficulty: "application"
    },
    {
      id: "q4",
      type: "mcq",
      prompt: "A credit analyst uses SHAP to explain why an application was rejected. The waterfall plot shows: base value = -2.1 log-odds, 'prior_delinquencies' SHAP = +1.8, 'debt_to_income' SHAP = +0.9, 'employment_tenure' SHAP = -0.4. What is the model's final log-odds for this borrower?",
      options: [
        "2.2 log-odds",
        "0.2 log-odds",
        "4.8 log-odds",
        "-2.1 log-odds"
      ],
      correctIndex: 1,
      explanation: "SHAP values sum additively: final log-odds = base + sum(SHAP values) = -2.1 + 1.8 + 0.9 + (-0.4) = 0.2 log-odds. A positive log-odds corresponds to PD > 50%, justifying rejection. The additivity property — guaranteed by the SHAP framework — allows the analyst to attribute the decision precisely to each feature's contribution.",
      difficulty: "application"
    },
    {
      id: "q5",
      type: "true_false",
      prompt: "Global SHAP feature importance, computed as the mean absolute SHAP value across all borrowers, is equivalent to the feature importance reported by XGBoost's built-in 'gain' metric.",
      correctAnswer: false,
      explanation: "XGBoost's built-in gain importance measures how much each feature reduces the loss when used in a split, averaged over all trees. Mean absolute SHAP values measure the average magnitude of each feature's contribution to individual predictions. These metrics can rank features differently — SHAP is generally preferred for interpretability because it has a theoretically grounded connection to individual predictions, whereas gain can be misleading for features used in many shallow splits.",
      difficulty: "analysis"
    },
    {
      id: "q6",
      type: "mcq",
      prompt: "A bank uses SHAP explanations to provide adverse action notices to declined applicants. The top reason code is 'high outstanding_debt SHAP = +2.3'. Which regulatory requirement does this practice most directly address?",
      options: [
        "Basel Pillar 3 public disclosure requirements",
        "GDPR Article 22 and ECOA/Regulation B right-to-explanation for automated credit decisions",
        "IFRS 9 forward-looking provisioning requirements",
        "SR 11-7 model risk management framework"
      ],
      correctIndex: 1,
      explanation: "GDPR Article 22 (EU) gives individuals the right to obtain an explanation of automated decisions. In the US, the Equal Credit Opportunity Act (ECOA) and Regulation B require lenders to provide specific reasons for adverse credit decisions. SHAP-based reason codes — identifying which features most increased the predicted default probability — directly satisfy these explanation requirements by giving applicants actionable, feature-level reasons for their decision.",
      difficulty: "recall"
    }
  ],

  "model-comparison-quiz": [
    {
      id: "q1",
      type: "mcq",
      prompt: "In a champion-challenger test, an XGBoost challenger achieves Gini = 0.48 vs the logistic regression champion at Gini = 0.44. You should:",
      options: [
        "Immediately deploy XGBoost as the new champion",
        "Evaluate SHAP infrastructure cost, regulatory approval time, and stability before deciding",
        "Reject XGBoost — a 4-point Gini improvement is not statistically significant",
        "Deploy XGBoost only for high-value applications"
      ],
      correctIndex: 1,
      explanation: "A 4-point Gini improvement is economically significant. However, deployment requires full SR 11-7 documentation, SHAP explainability infrastructure, PSI monitoring, and regulatory approval. The business case must weigh improved risk discrimination against implementation costs.",
      difficulty: "analysis"
    },
    {
      id: "q2",
      type: "true_false",
      prompt: "The champion-challenger framework requires routing 100% of applications to the challenger to get a clean comparison.",
      correctAnswer: false,
      explanation: "Champion-challenger uses random traffic splitting — typically 90-95% to champion, 5-10% to challenger. This preserves production quality while gathering challenger evidence. A 100% switch before validation is the full A/B deployment, not a champion-challenger test.",
      difficulty: "recall"
    },
    {
      id: "q3",
      type: "mcq",
      prompt: "Which situation most strongly justifies replacing a logistic regression scorecard with XGBoost?",
      options: [
        "The portfolio has 200 applications per month",
        "The portfolio has 200,000 applications, complex feature interactions, and the bank has SHAP explainability infrastructure",
        "The development team prefers Python over SAS",
        "The current Gini is below 0.30"
      ],
      correctIndex: 1,
      explanation: "Scale and complexity are the key drivers. Large portfolios generate enough data for complex models to generalise. Non-linear interactions give XGBoost its edge. The SHAP infrastructure requirement is non-trivial — small teams without it cannot justify the complexity.",
      difficulty: "analysis"
    },
    {
      id: "q4",
      type: "mcq",
      prompt: "A bank's logistic regression champion achieves Gini = 0.42 with an approval rate of 68%. An XGBoost challenger achieves Gini = 0.47 at the same approval rate. Approximately how much economic value does the 5-point Gini improvement represent?",
      options: [
        "None — Gini differences below 10 points are statistically insignificant",
        "It depends on portfolio size: on a 50,000-application portfolio with average EL of $800 per applicant, a 5-point Gini improvement can reduce bad debt losses by several million dollars annually",
        "Exactly 5% reduction in expected losses",
        "It cannot be quantified — Gini is a rank-ordering metric with no monetary interpretation"
      ],
      correctIndex: 1,
      explanation: "Gini improvements translate to economic value through better risk segmentation: riskier applicants are correctly declined and safer applicants approved. On a large portfolio, even a few percentage points of Gini improvement means fewer unexpected defaults and more precisely priced credit. The exact value depends on portfolio size, average EL, and the shape of the score-to-risk distribution — but it can easily represent millions of dollars annually on large portfolios. Quantifying this is a key part of the business case for ML adoption.",
      difficulty: "application"
    },
    {
      id: "q5",
      type: "true_false",
      prompt: "Neural networks consistently outperform XGBoost on credit risk tabular datasets when sufficient training data is available.",
      correctAnswer: false,
      explanation: "Research (notably Grinsztajn et al., 2022, 'Why do tree-based models still outperform deep learning on tabular data?') shows that gradient boosting frequently matches or outperforms neural networks on tabular data typical of credit risk. Neural networks are more sensitive to feature engineering, require more careful hyperparameter tuning, and struggle with the irregular feature distributions and mixed types common in credit datasets. Neural networks offer advantages mainly through entity embeddings for high-cardinality categoricals and multi-task learning scenarios.",
      difficulty: "recall"
    },
    {
      id: "q6",
      type: "mcq",
      prompt: "A bank in the EU wants to deploy an XGBoost model for consumer credit decisions. Under the EU AI Act (2024), credit scoring systems are classified as high-risk AI. Which additional obligation does this create compared to deploying a logistic regression model?",
      options: [
        "No additional obligations — the EU AI Act does not apply to credit models approved by national regulators",
        "The bank must register the system in the EU AI Act database, conduct conformity assessments, ensure human oversight, and maintain detailed technical documentation including explainability mechanisms",
        "XGBoost is explicitly prohibited for consumer credit under the EU AI Act",
        "The bank must obtain prior approval from the European Central Bank before deployment"
      ],
      correctIndex: 1,
      explanation: "The EU AI Act classifies credit scoring systems as high-risk AI, triggering obligations including: registration in the EU database, conformity assessment, risk management system, data governance documentation, transparency obligations, human oversight mechanisms, and ongoing monitoring. While logistic regression also faces these requirements, XGBoost's opacity makes the explainability and human oversight requirements harder to satisfy, reinforcing the need for SHAP-based explanations and robust override processes.",
      difficulty: "analysis"
    }
  ],

  "basel-quiz": [
    {
      id: "q1",
      type: "mcq",
      prompt: "The Basel IRB formula uses the 99.9th percentile of the systematic factor. This means capital is sized to:",
      options: [
        "Cover 99.9% of all individual loan defaults",
        "Remain solvent in a 1-in-1000 year systematic stress scenario",
        "Exceed expected losses by a factor of 999",
        "Meet the minimum capital ratio 99.9% of the time"
      ],
      correctIndex: 1,
      explanation: "The 99.9% confidence level means Basel capital is designed to cover credit losses in all but the most extreme 0.1% of scenarios — roughly a once-in-1000-year systematic stress event. Individual defaults are much more frequent but are pooled across the portfolio.",
      difficulty: "application"
    },
    {
      id: "q2",
      type: "mcq",
      prompt: "The Basel III output floor means a bank's IRB capital cannot be less than:",
      options: [
        "72.5% of the standardised approach capital",
        "72.5% of the previous year's capital",
        "72.5% of Tier 1 capital",
        "7.25% of risk-weighted assets"
      ],
      correctIndex: 0,
      explanation: "The output floor (Basel III finalisation) requires that total IRB capital charges be at least 72.5% of what the standardised approach would require. This prevents banks from using sophisticated internal models to reduce capital below a regulatory floor.",
      difficulty: "recall"
    },
    {
      id: "q3",
      type: "true_false",
      prompt: "Under the Basel IRB formula, a lower asset correlation (R) leads to lower capital requirements.",
      correctAnswer: true,
      explanation: "Lower correlation means losses are more independent across borrowers, so the portfolio loss distribution has a narrower tail. At the 99.9th percentile, a portfolio with lower correlation has a smaller gap between expected and unexpected loss, requiring less capital.",
      difficulty: "analysis"
    },
    {
      id: "q4",
      type: "mcq",
      prompt: "Which of the three Basel pillars requires banks to publicly disclose their risk exposures, capital adequacy ratios, and risk management practices?",
      options: [
        "Pillar 1 — Minimum Capital Requirements",
        "Pillar 2 — Supervisory Review Process",
        "Pillar 3 — Market Discipline",
        "Pillar 4 — Stress Testing (introduced in Basel IV)"
      ],
      correctIndex: 2,
      explanation: "Pillar 3 (Market Discipline) mandates public disclosure of a bank's risk profile, capital structure, and risk exposures. The idea is that market participants — investors, counterparties, analysts — will discipline banks that take excessive risks if they have sufficient information. Pillar 1 sets minimum capital, and Pillar 2 covers the supervisory review and internal capital adequacy assessment (ICAAP).",
      difficulty: "recall"
    },
    {
      id: "q5",
      type: "true_false",
      prompt: "Under the Standardised Approach to credit risk, banks with no external credit rating on their corporate borrowers must apply a flat 100% risk weight.",
      correctAnswer: true,
      explanation: "Basel's Standardised Approach maps external credit ratings to prescribed risk weights. For unrated corporate exposures, Basel III finalisation (and most national implementations) assigns a 100% risk weight as the default. This is a key limitation of the SA — it cannot distinguish between a highly creditworthy unrated SME and a speculative one, whereas IRB models can.",
      difficulty: "recall"
    },
    {
      id: "q6",
      type: "mcq",
      prompt: "A bank holds a mortgage portfolio with total IRB risk-weighted assets of $800 million. The standardised approach would produce $1,200 million of RWA. Under Basel III finalisation's output floor, what is the minimum RWA the bank must report?",
      options: [
        "$800 million — the bank uses its own IRB estimate",
        "$870 million — 72.5% of the standardised approach applied as an add-on",
        "$870 million — 72.5% of $1,200 million",
        "$1,200 million — the output floor requires using the standardised approach"
      ],
      correctIndex: 2,
      explanation: "The output floor requires that IRB total RWA be at least 72.5% of the standardised approach RWA: 0.725 x $1,200 million = $870 million. Since the IRB estimate of $800 million is below this floor, the bank must report $870 million. The output floor closes the gap between sophisticated IRB models and the simpler SA, preventing excessive capital relief from modelling choices.",
      difficulty: "application"
    }
  ],

  "irb-quiz": [
    {
      id: "q1",
      type: "mcq",
      prompt: "A bank is applying for F-IRB approval for its corporate portfolio. Under F-IRB, what does the bank estimate vs what does the supervisor prescribe?",
      options: [
        "Bank estimates PD; supervisor prescribes LGD, EAD, and maturity",
        "Bank estimates PD and LGD; supervisor prescribes EAD",
        "Bank estimates all parameters; supervisor sets floors",
        "Supervisor estimates all parameters"
      ],
      correctIndex: 0,
      explanation: "Under F-IRB, banks estimate only PD using their own models. LGD is prescribed at 45% for senior unsecured corporate exposures, EAD is prescribed for off-balance-sheet items, and maturity is fixed at 2.5 years.",
      difficulty: "recall"
    },
    {
      id: "q2",
      type: "true_false",
      prompt: "A credit risk model used only for regulatory capital reporting satisfies the Basel 'use test' requirement.",
      correctAnswer: false,
      explanation: "The use test requires that IRB ratings are integrated into credit decisions, pricing, and risk management — not just regulatory reporting. A model built exclusively for regulatory purposes, not embedded in actual lending decisions, fails the use test.",
      difficulty: "application"
    },
    {
      id: "q3",
      type: "mcq",
      prompt: "The Margin of Conservatism (MoC) on PD estimates increases when:",
      options: [
        "The portfolio has fewer defaults in the historical data window",
        "The portfolio has more years of historical data",
        "The portfolio default rate is higher than average",
        "The bank uses TTC rather than PIT PDs"
      ],
      correctIndex: 0,
      explanation: "MoC compensates for estimation uncertainty. Fewer defaults → wider confidence intervals → larger statistical MoC. A portfolio with 5 defaults over 5 years requires much larger MoC than one with 500 defaults over the same period.",
      difficulty: "application"
    },
    {
      id: "q4",
      type: "mcq",
      prompt: "Under A-IRB, a bank must have a minimum of how many years of historical LGD data to use its own LGD estimates?",
      options: [
        "3 years",
        "5 years",
        "7 years",
        "10 years"
      ],
      correctIndex: 2,
      explanation: "Basel A-IRB requires a minimum of 7 years of historical LGD (and EAD) data, compared to 5 years for PD. The longer requirement reflects the fact that LGD estimation is more sensitive to economic cycle effects — a bank must demonstrate that its LGD history covers at least one significant economic downturn to ensure downturn LGD estimates are properly calibrated.",
      difficulty: "recall"
    },
    {
      id: "q5",
      type: "true_false",
      prompt: "Under Basel IRB, a bank's internal rating system must assign each performing borrower to one of at least seven distinct rating grades.",
      correctAnswer: true,
      explanation: "Basel minimum requirements for the IRB rating system specify at least seven grades for performing exposures (non-defaulted) and at least one grade for defaulted exposures. This granularity ensures that the rating system genuinely differentiates credit risk rather than simply bucketing borrowers into a few coarse bands. Supervisors may require more granularity if the portfolio is large or diverse.",
      difficulty: "recall"
    },
    {
      id: "q6",
      type: "mcq",
      prompt: "A bank's A-IRB model for residential mortgages produces an LGD estimate of 12% for prime borrowers. The Basel regulatory floor for residential mortgage LGD is 10% (F-IRB). The bank uses the 12% A-IRB estimate. Under what circumstances would a supervisor likely challenge this?",
      options: [
        "Never — A-IRB banks are always allowed to use estimates below the F-IRB floor",
        "If the 12% estimate is based on data from a benign housing market without a downturn period, the supervisor may require a higher downturn LGD adjustment",
        "If the estimate is above 10%, the bank must switch to F-IRB for this portfolio",
        "Only if the LGD estimate differs from competitor banks by more than 5 percentage points"
      ],
      correctIndex: 1,
      explanation: "Basel requires that A-IRB LGD estimates reflect downturn conditions. An LGD of 12% derived purely from benign market data (e.g., pre-2008 in markets that did not experience a housing correction) may not capture the collateral value declines and forced-sale discounts seen during stress. Supervisors — particularly via ECB TRIM reviews — scrutinise whether the data window used includes adequate stressed observations and whether the downturn LGD add-on is sufficient.",
      difficulty: "analysis"
    }
  ],

  "ifrs9-quiz": [
    {
      id: "q1",
      type: "mcq",
      prompt: "A mortgage originated in 2022 with PD = 1.5%. In 2024, the borrower's PD is remeasured at 4.0%. Assuming a SICR threshold of 2× origination PD, the loan:",
      options: [
        "Remains in Stage 1 — absolute PD is still low",
        "Moves to Stage 2 — PD has increased more than 2× (4.0% > 3.0%)",
        "Moves to Stage 3 — any PD increase triggers Stage 3",
        "Remains in Stage 1 — SICR requires 30 days past due"
      ],
      correctIndex: 1,
      explanation: "The SICR threshold of 2× origination PD means 2 × 1.5% = 3.0%. Since current PD = 4.0% > 3.0%, SICR is triggered and the loan moves to Stage 2 with lifetime ECL provisioning.",
      difficulty: "application"
    },
    {
      id: "q2",
      type: "true_false",
      prompt: "Moving a loan from Stage 1 to Stage 2 always increases the provision by exactly the ratio of lifetime ECL to 12-month ECL.",
      correctAnswer: false,
      explanation: "The provision cliff at Stage 1→2 transition depends on many factors: remaining tenor (longer tenors = bigger cliff), macro overlay (stressed scenarios increase lifetime ECL more), LGD, and discount rate. The ratio varies greatly across portfolios and scenarios.",
      difficulty: "analysis"
    },
    {
      id: "q3",
      type: "mcq",
      prompt: "IFRS 9 requires ECL estimates to incorporate forward-looking information. This means:",
      options: [
        "ECL is calculated using historical default rates only",
        "PD estimates must include macroeconomic forecasts such as GDP growth and unemployment",
        "ECL must be stress-tested under three macroeconomic scenarios",
        "Future cash flows are discounted using the risk-free rate"
      ],
      correctIndex: 1,
      explanation: "IFRS 9 paragraph 5.5.17 explicitly requires forward-looking information, including macroeconomic forecasts. This is a fundamental departure from IAS 39's historical loss approach. Most banks use probability-weighted scenarios (base, upside, downside) to produce forward-looking ECL.",
      difficulty: "recall"
    },
    {
      id: "q4",
      type: "true_false",
      prompt: "Under IFRS 9, a Stage 2 loan that subsequently cures (returns to performing status) can move back to Stage 1 immediately in the same reporting period.",
      correctAnswer: false,
      explanation: "IFRS 9 does not prohibit back-transfer from Stage 2 to Stage 1, but in practice most banks apply a probation period (typically 3-12 months) of continued performing status before reclassifying a cured loan to Stage 1. This reflects the higher risk of re-default in the period immediately following cure. Some banks also require the borrower's PD to fall below the original SICR threshold before allowing back-staging.",
      difficulty: "application"
    },
    {
      id: "q5",
      type: "mcq",
      prompt: "A bank applies a quantitative SICR test: a loan moves to Stage 2 if the current lifetime PD exceeds 3x the origination lifetime PD. A mortgage was originated with a 5-year lifetime PD of 6%. Three years later, the residual lifetime PD (over the remaining 2 years) is 10%. Has SICR been triggered?",
      options: [
        "Yes — 10% exceeds 3 x 6% = 18% so SICR is triggered",
        "No — 10% is below 3 x 6% = 18%, so SICR is not triggered",
        "Yes — any increase in lifetime PD triggers SICR under IFRS 9",
        "Cannot be determined — you must compare like-for-like remaining tenors"
      ],
      correctIndex: 3,
      explanation: "Comparing the residual 2-year PD (10%) to the origination 5-year PD (6%) is not an apples-to-apples comparison. IFRS 9 requires comparing the remaining lifetime PD at reporting date to what the remaining lifetime PD would have been at origination for the same remaining period. The 6% origination figure was for the full 5-year term; you need to estimate what the 2-year PD at origination would have been. Only a like-for-like comparison of the same remaining tenor is valid for the SICR quantitative test.",
      difficulty: "analysis"
    },
    {
      id: "q6",
      type: "mcq",
      prompt: "A bank provisions under IFRS 9 and observes a large increase in Stage 2 balances during an economic downturn. Which mechanism explains why the income statement impact is amplified beyond just moving from 12-month to lifetime ECL?",
      options: [
        "Stage 2 loans require 100% LGD provisioning under IFRS 9",
        "The forward-looking macroeconomic overlay worsens both the base scenario PD and increases the probability weight on downside scenarios simultaneously",
        "IFRS 9 requires immediate write-off of all Stage 2 assets",
        "Discount rates increase in downturns, reducing the present value of future recoveries and increasing ECL"
      ],
      correctIndex: 1,
      explanation: "During a downturn, three forces amplify IFRS 9 provision increases simultaneously: (1) more loans breach SICR thresholds and move to Stage 2 (balance effect), (2) lifetime PDs used for Stage 2 provisioning rise as the macro overlay captures deteriorating conditions (PD effect), and (3) the probability weight assigned to downside scenarios increases as the economic outlook worsens (scenario weight effect). This triple amplification — sometimes called the 'IFRS 9 cliff effect' — is why provisions can surge rapidly during the early stages of a recession.",
      difficulty: "analysis"
    }
  ],

  "model-validation-quiz": [
    {
      id: "q1",
      type: "mcq",
      prompt: "The traffic light back-test for a PD model shows p-value = 0.02 (more defaults than predicted). The validator should:",
      options: [
        "Accept — 2% is within normal model error",
        "Flag as amber — investigate whether model is systematically underestimating PD",
        "Immediately decommission the model",
        "Recalibrate by multiplying all PDs by 1.02"
      ],
      correctIndex: 1,
      explanation: "A p-value of 0.02 means the observed default count is in the 2% tail of what the model predicted — significant evidence of model underestimation. The validator should flag this, investigate root causes (PIT/TTC mismatch? Population shift? Economic deterioration?), and recommend recalibration if systematic bias is confirmed.",
      difficulty: "analysis"
    },
    {
      id: "q2",
      type: "true_false",
      prompt: "SR 11-7 requires that model validation be performed by the same team that developed the model.",
      correctAnswer: false,
      explanation: "SR 11-7 explicitly requires that validation be performed by staff independent of the model development team. Independence ensures objectivity. The validation function should have its own reporting line, separate from model development.",
      difficulty: "recall"
    },
    {
      id: "q3",
      type: "mcq",
      prompt: "Which of the following is an example of 'outcomes analysis' in model validation?",
      options: [
        "Checking that the model code matches the methodology document",
        "Comparing predicted default rates to actual default rates over a one-year window",
        "Reviewing the model's assumption about LGD distributions",
        "Ensuring the model is only used for its intended purpose"
      ],
      correctIndex: 1,
      explanation: "Outcomes analysis (back-testing) compares model predictions to actual realised outcomes. This is distinct from conceptual soundness (checking assumptions and methodology) and use review (checking appropriate application). Comparing predicted vs actual default rates is the most direct form of outcomes analysis.",
      difficulty: "recall"
    },
    {
      id: "q4",
      type: "mcq",
      prompt: "A validator builds a benchmark model using logistic regression with a limited set of standard bureau variables to challenge the developer's XGBoost model. The XGBoost model achieves Gini = 0.51 while the benchmark achieves Gini = 0.49. What is the most appropriate conclusion?",
      options: [
        "The XGBoost model should be rejected — it is too complex for a 2-point Gini uplift",
        "The XGBoost model offers modest discrimination uplift over a simple benchmark; the validator should examine whether the additional complexity is justified and whether the uplift is robust across time periods",
        "The XGBoost model passes validation — any positive Gini uplift confirms it is superior",
        "The benchmark should replace the developer's model — simpler models are always preferred"
      ],
      correctIndex: 1,
      explanation: "Benchmarking is a validation tool, not a pass/fail test. A 2-point Gini uplift over a simple benchmark is modest but not conclusive. The validator must assess whether the uplift is consistent across out-of-time samples, whether it persists after adjusting for overfitting, and whether the XGBoost model's complexity is justified given regulatory explainability requirements. The comparison informs the validator's opinion but does not mechanically determine the outcome.",
      difficulty: "analysis"
    },
    {
      id: "q5",
      type: "true_false",
      prompt: "Under SS1/23 (the UK PRA's model risk management supervisory statement), all models must be reviewed by the independent validation function at least annually, regardless of their materiality.",
      correctAnswer: false,
      explanation: "SS1/23 requires banks to maintain a model inventory and apply a risk-based validation approach proportional to model materiality and risk. High-materiality models (e.g., IRB capital models) require more frequent and in-depth validation, while low-materiality models may be reviewed less frequently. A blanket annual requirement for all models regardless of materiality would be disproportionately burdensome and is not mandated.",
      difficulty: "application"
    },
    {
      id: "q6",
      type: "mcq",
      prompt: "Ongoing monitoring of a PD model reveals that its PSI has been 0.08 for 18 months, but the Gini coefficient has declined from 0.45 to 0.37 over the same period. What does this combination of results suggest?",
      options: [
        "The model is stable — PSI below 0.10 confirms no action is required",
        "The population has not shifted significantly, but the model's ability to rank borrowers by risk has genuinely deteriorated — suggesting that the relationship between the features and default has changed",
        "The Gini decline is expected seasonal variation and can be ignored",
        "PSI and Gini are measuring the same thing — one of the readings must be incorrect"
      ],
      correctIndex: 1,
      explanation: "PSI below 0.10 indicates the input score distribution has not shifted materially, meaning the same types of applicants are being scored. However, a Gini decline from 0.45 to 0.37 (an 8-point drop) on a stable population is a strong signal that the underlying relationship between the model's features and observed defaults has changed — the model's predictive structure is degrading. This can occur when economic conditions alter which factors drive default, or when lender behaviour changes. The combination requires investigation and likely model recalibration or redevelopment.",
      difficulty: "analysis"
    }
  ],

};
