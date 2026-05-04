// All Python code samples indexed by ID.
// Stored here (not in MDX) to avoid MDX/acorn f-string parsing issues.

export const CODE_SAMPLES: Record<string, string> = {
  // ── Core Concepts ──────────────────────────────────────────────────────────

  "el-basic": `import numpy as np

# Loan portfolio parameters
ead = 1_000_000     # $1M exposure
pd  = 0.05          # 5% PD
lgd = 0.45          # 45% LGD

el = pd * lgd * ead
ul = np.sqrt(pd * (1 - pd)) * lgd * ead  # simplified 1-sigma UL

print("Expected Loss   :", f"\${el:>12,.0f}")
print("Unexpected Loss :", f"\${ul:>12,.0f}  (1-sigma, single asset)")
print("EL / EAD        :", f"{el/ead*100:.2f}%  (minimum required spread)")
`,

  "merton-dd": `import numpy as np
from scipy.stats import norm

def distance_to_default(V_A, D, sigma_A, T=1):
    """Simplified KMV Distance to Default."""
    dd = (np.log(V_A / D) + 0.5 * sigma_A**2 * T) / (sigma_A * np.sqrt(T))
    pd_risk_neutral = norm.cdf(-dd)
    return dd, pd_risk_neutral

# Example: firm with assets $120M, debt $80M, asset vol 25%
V_A     = 120e6
D       = 80e6
sigma_A = 0.25

dd, pd = distance_to_default(V_A, D, sigma_A)
print(f"Asset Value      : \${V_A/1e6:.0f}M")
print(f"Default Point    : \${D/1e6:.0f}M")
print(f"Distance to Def  : {dd:.2f} sigma")
print(f"Risk-Neutral PD  : {pd*100:.2f}%")

# Sensitivity to leverage
print("\\nLeverage sensitivity:")
for leverage in [0.5, 0.6, 0.7, 0.8]:
    D_lev = V_A * leverage
    dd_l, pd_l = distance_to_default(V_A, D_lev, sigma_A)
    print(f"  D/V = {leverage:.0%}  DD = {dd_l:.2f}  PD = {pd_l*100:.2f}%")
`,

  "cohort-pd": `import numpy as np
import matplotlib.pyplot as plt

np.random.seed(42)

years       = list(range(2018, 2024))
cohort_size = 10_000
true_pds    = [0.020, 0.025, 0.055, 0.022, 0.020, 0.019]
observed_defaults = [np.random.binomial(cohort_size, p) for p in true_pds]
observed_rates    = [d / cohort_size for d in observed_defaults]

ttc_pd = np.mean(observed_rates[:-2])

print("Cohort Analysis Results:")
print(f"{'Year':>6} {'Defaults':>10} {'Obs PD':>8}")
print("-" * 30)
for yr, obs_d, obs_r in zip(years, observed_defaults, observed_rates):
    note = " <- COVID vintage" if yr == 2020 else ""
    print(f"{yr:>6} {obs_d:>10,} {obs_r:>7.2%}{note}")

print(f"\\nTTC PD estimate (3yr avg): {ttc_pd:.2%}")

fig, ax = plt.subplots(figsize=(8, 4))
ax.bar(years, [r*100 for r in observed_rates], color='steelblue', alpha=0.7)
ax.axhline(ttc_pd*100, color='red', linestyle='--', label=f'TTC avg = {ttc_pd:.2%}')
ax.set_xlabel('Vintage Year')
ax.set_ylabel('Observed Default Rate (%)')
ax.set_title('Annual Default Rates by Cohort')
ax.legend()
plt.tight_layout()
plt.show()
`,

  "lgd-dist": `import numpy as np
import matplotlib.pyplot as plt
from scipy.stats import beta

np.random.seed(42)
n = 5000

high_recovery = beta.rvs(2, 10, size=int(n*0.3))
low_recovery  = beta.rvs(10, 2, size=int(n*0.7))
lgd_sample    = np.clip(np.concatenate([high_recovery, low_recovery]), 0, 1)

fig, axes = plt.subplots(1, 2, figsize=(10, 4))

axes[0].hist(lgd_sample, bins=50, color='steelblue', edgecolor='white', alpha=0.8)
axes[0].axvline(lgd_sample.mean(), color='red', linestyle='--',
                label=f'Mean LGD = {lgd_sample.mean():.1%}')
axes[0].set_xlabel('LGD')
axes[0].set_ylabel('Frequency')
axes[0].set_title('Unsecured Retail LGD Distribution')
axes[0].legend()

collateral_types = {
    'Unsecured':  np.clip(beta.rvs(8, 3,  size=1000), 0, 1),
    'Auto Loan':  np.clip(beta.rvs(3, 5,  size=1000), 0, 1),
    'Mortgage':   np.clip(beta.rvs(2, 8,  size=1000), 0, 1),
    'First Lien': np.clip(beta.rvs(1, 10, size=1000), 0, 1),
}
axes[1].boxplot(list(collateral_types.values()), labels=list(collateral_types.keys()))
axes[1].set_ylabel('LGD')
axes[1].set_title('LGD by Collateral Type')
axes[1].tick_params(axis='x', rotation=15)

plt.tight_layout()
plt.show()
print(f"Mean LGD (unsecured): {lgd_sample.mean():.1%}")
print(f"Median LGD:           {np.median(lgd_sample):.1%}")
`,

  "ead-ccf": `import numpy as np
import pandas as pd

np.random.seed(0)
n = 1000

drawn_at_obs = np.random.uniform(0.2, 0.8, n) * 100_000
limit        = np.full(n, 100_000.0)
undrawn      = limit - drawn_at_obs

ccf_actual = np.clip(np.random.beta(2, 3, n), 0, 1)
ead        = drawn_at_obs + ccf_actual * undrawn

df = pd.DataFrame({
    'drawn_pct': drawn_at_obs / limit,
    'ccf':       ccf_actual,
    'ead':       ead,
    'ead_pct':   ead / limit,
})

print("EAD / Limit Statistics:")
print(df['ead_pct'].describe().to_string())
print(f"\\nMean CCF: {df['ccf'].mean():.2%}")
print(f"75th pct CCF: {df['ccf'].quantile(0.75):.2%}")
print(f"\\nBorrowers using >90%% of limit at default: {(df['ead_pct'] > 0.9).mean():.1%}")
`,

  "gaussian-copula": `import numpy as np
import matplotlib.pyplot as plt
from scipy.stats import norm

np.random.seed(42)

n_sims  = 50_000
n_loans = 200
pd      = 0.03
lgd     = 0.45
ead     = 10_000
rho     = 0.15
total_ead = n_loans * ead

Z       = np.random.standard_normal(n_sims)
epsilon = np.random.standard_normal((n_sims, n_loans))
R       = np.sqrt(rho) * Z[:, None] + np.sqrt(1 - rho) * epsilon

default_threshold = norm.ppf(pd)
defaults = (R < default_threshold).sum(axis=1)
losses   = defaults * lgd * ead

el      = losses.mean()
var_99  = np.percentile(losses, 99)
var_999 = np.percentile(losses, 99.9)
cvar_99 = losses[losses >= var_99].mean()

print(f"Portfolio EAD : \${total_ead:>12,.0f}")
print(f"Expected Loss : \${el:>12,.0f}  ({el/total_ead:.2%})")
print(f"VaR (99%%)    : \${var_99:>12,.0f}  ({var_99/total_ead:.2%})")
print(f"VaR (99.9%%)  : \${var_999:>12,.0f}  ({var_999/total_ead:.2%})")
print(f"CVaR (99%%)   : \${cvar_99:>12,.0f}  ({cvar_99/total_ead:.2%})")

fig, ax = plt.subplots(figsize=(9, 4))
ax.hist(losses / 1000, bins=80, color='steelblue', edgecolor='white', alpha=0.7, density=True)
ax.axvline(el/1000,     color='green',  linewidth=2, label=f'EL = \${el/1000:.0f}k')
ax.axvline(var_99/1000, color='orange', linewidth=2, linestyle='--', label=f'VaR 99%% = \${var_99/1000:.0f}k')
ax.axvline(var_999/1000,color='red',    linewidth=2, linestyle='--', label=f'VaR 99.9%% = \${var_999/1000:.0f}k')
ax.set_xlabel('Portfolio Loss ($000s)')
ax.set_ylabel('Density')
ax.set_title(f'Portfolio Loss Distribution (rho={rho}, n={n_loans} loans)')
ax.legend()
plt.tight_layout()
plt.show()
`,

  "hhi": `import numpy as np

def hhi(exposures):
    w = np.array(exposures) / sum(exposures)
    return (w**2).sum()

portfolios = {
    "100 equal loans":  [1] * 100,
    "10 equal loans":   [1] * 10,
    "Skewed (1 large)": [50] + [1] * 49,
    "Single borrower":  [1],
}
for name, exp in portfolios.items():
    h = hhi(exp)
    print(f"{name:<25} HHI = {h:.4f}  (eff. n = {1/h:.0f})")
`,

  // ── Credit Scoring ─────────────────────────────────────────────────────────

  "logistic-fit": `import numpy as np
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import roc_auc_score
import warnings; warnings.filterwarnings('ignore')

np.random.seed(42)
n = 5000

bureau_score   = np.random.normal(680, 80, n).clip(300, 850)
dti_ratio      = np.random.beta(2, 5, n)
employment_yrs = np.random.exponential(5, n).clip(0, 30)
loan_amount    = np.random.lognormal(10.5, 0.5, n)
prior_defaults = np.random.poisson(0.15, n).clip(0, 5)

log_odds = (
    -4.0
    - 0.012 * (bureau_score - 700)
    + 3.0  * dti_ratio
    - 0.05 * employment_yrs
    + 0.001 * (loan_amount / 1000)
    + 1.2  * prior_defaults
    + np.random.logistic(0, 0.3, n)
)
pd_true = 1 / (1 + np.exp(-log_odds))
y = np.random.binomial(1, pd_true)

X = pd.DataFrame({
    'bureau_score':   bureau_score,
    'dti_ratio':      dti_ratio,
    'employment_yrs': employment_yrs,
    'loan_amount_k':  loan_amount / 1000,
    'prior_defaults': prior_defaults,
})

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = LogisticRegression(max_iter=500)
model.fit(X_train, y_train)

print("Logistic Regression Results")
print("=" * 50)
for feat, coef in zip(X.columns, model.coef_[0]):
    odds_ratio = np.exp(coef)
    direction  = "riskier" if coef > 0 else "safer  "
    print(f"  {feat:<20} beta={coef:+.4f}  OR={odds_ratio:.3f}  ({direction})")

pd_hat = model.predict_proba(X_test)[:, 1]
auc  = roc_auc_score(y_test, pd_hat)
print(f"\\nAUC  = {auc:.4f}")
print(f"Gini = {2*auc-1:.4f}")
print(f"Default rate (test) = {y_test.mean():.2%}")
`,

  "calibration": `import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LogisticRegression
from sklearn.calibration import calibration_curve
from sklearn.model_selection import train_test_split

np.random.seed(42)
n = 5000
bureau_score = np.random.normal(680, 80, n).clip(300, 850)
dti_ratio    = np.random.beta(2, 5, n)
log_odds     = -4.0 - 0.012*(bureau_score-700) + 3.0*dti_ratio + np.random.logistic(0, 0.3, n)
pd_true      = 1/(1+np.exp(-log_odds))
y            = np.random.binomial(1, pd_true)

X = np.column_stack([bureau_score, dti_ratio])
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=0)
model = LogisticRegression(max_iter=500)
model.fit(X_train, y_train)
pd_hat = model.predict_proba(X_test)[:, 1]

frac_pos, mean_pred = calibration_curve(y_test, pd_hat, n_bins=10)
fig, ax = plt.subplots(figsize=(7, 5))
ax.plot([0, 1], [0, 1], 'k--', label='Perfect calibration')
ax.plot(mean_pred, frac_pos, 'o-', color='steelblue', label='Model')
ax.set_xlabel('Mean Predicted PD')
ax.set_ylabel('Fraction Defaulting (Actual)')
ax.set_title('Calibration Plot')
ax.legend()
plt.tight_layout()
plt.show()
`,

  "woe-compute": `import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

def compute_woe_iv(df, feature, target, bins=10):
    df2 = df[[feature, target]].copy()
    df2['bin'] = pd.qcut(df2[feature], q=bins, duplicates='drop')
    total_bad  = df2[target].sum()
    total_good = len(df2) - total_bad
    stats = df2.groupby('bin', observed=True)[target].agg(['sum', 'count'])
    stats.columns = ['bad', 'count']
    stats['good']       = stats['count'] - stats['bad']
    stats['pct_bad']    = stats['bad']  / total_bad
    stats['pct_good']   = stats['good'] / total_good
    stats['woe']        = np.log(stats['pct_bad'] / stats['pct_good'].clip(1e-9))
    stats['iv_contrib'] = (stats['pct_bad'] - stats['pct_good']) * stats['woe']
    stats['event_rate'] = stats['bad'] / stats['count']
    return stats, stats['iv_contrib'].sum()

np.random.seed(42)
n = 8000
bureau_score = np.random.normal(680, 80, n).clip(300, 850)
log_odds     = -4.0 - 0.013*(bureau_score - 700)
pd_true      = 1/(1+np.exp(-log_odds))
default      = np.random.binomial(1, pd_true)

df    = pd.DataFrame({'bureau_score': bureau_score, 'default': default})
stats, iv = compute_woe_iv(df, 'bureau_score', 'default', bins=8)

strength = 'Strong' if iv > 0.3 else 'Medium' if iv > 0.1 else 'Weak'
print(f"Bureau Score -- IV = {iv:.4f} ({strength})")
print()
print(stats[['count', 'event_rate', 'woe', 'iv_contrib']].to_string(float_format='%.4f'))

fig, ax = plt.subplots(figsize=(9, 4))
colors = ['tomato' if w > 0 else 'mediumseagreen' for w in stats['woe']]
ax.bar(range(len(stats)), stats['woe'], color=colors, edgecolor='white')
ax.axhline(0, color='black', linewidth=0.8)
ax.set_xticks(range(len(stats)))
ax.set_xticklabels([str(i) for i in stats.index], rotation=30, ha='right', fontsize=8)
ax.set_ylabel('WoE')
ax.set_title(f'WoE by Credit Score Bin  (IV = {iv:.3f})')
plt.tight_layout()
plt.show()
`,

  "scorecard-build": `import numpy as np
import pandas as pd
from sklearn.linear_model import LogisticRegression
import warnings; warnings.filterwarnings('ignore')

np.random.seed(42)
n = 8000
bureau_woe = np.random.normal(0, 0.8, n)
dti_woe    = np.random.normal(0, 0.6, n)
empyrs_woe = np.random.normal(0, 0.4, n)
pd_true    = 1/(1+np.exp(-(-2 - 0.9*bureau_woe - 0.7*dti_woe - 0.4*empyrs_woe)))
y          = np.random.binomial(1, pd_true)

X     = pd.DataFrame({'bureau_woe': bureau_woe, 'dti_woe': dti_woe, 'empyrs_woe': empyrs_woe})
model = LogisticRegression()
model.fit(X, y)

pdo     = 20
score_0 = 600
odds_0  = 50
factor  = pdo / np.log(2)
offset  = score_0 - factor * np.log(odds_0)
betas   = dict(zip(X.columns, model.coef_[0]))
p       = len(betas)
b0      = model.intercept_[0]

print("=== Scorecard Point Allocation ===")
print(f"PDO={pdo}, Reference Score={score_0} at odds 1:{odds_0}")
print(f"Factor = {factor:.4f}, Offset = {offset:.4f}")
print()
for feat, beta in betas.items():
    pts = -(beta * 0 + b0/p) * factor
    print(f"  {feat:<15} beta={beta:+.4f}  neutral_pts={pts:.1f}")

sample   = {'bureau_woe': 0.5, 'dti_woe': -0.3, 'empyrs_woe': 0.2}
log_odds = b0 + sum(betas[f]*v for f, v in sample.items())
pd_hat   = 1/(1+np.exp(-log_odds))
score    = offset + factor * np.log(1/pd_hat - 1)
print(f"\\nSample record score: {score:.0f}  (PD = {pd_hat:.2%})")
`,

  "scoreband": `import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

np.random.seed(0)
n = 15_000
log_odds = np.random.normal(-2, 1.5, n)
pd_true  = 1/(1+np.exp(-log_odds))
default  = np.random.binomial(1, pd_true)
score    = np.clip(600 - (log_odds / np.log(2)) * 20, 300, 900)

df = pd.DataFrame({'score': score, 'default': default})
df['band'] = pd.cut(df['score'], bins=range(300, 901, 50))

summary = df.groupby('band', observed=True)['default'].agg(['sum', 'count'])
summary.columns = ['defaults', 'count']
summary['default_rate'] = summary['defaults'] / summary['count']
summary = summary.reset_index()

fig, ax = plt.subplots(figsize=(10, 4))
ax.bar(range(len(summary)), summary['default_rate']*100,
       color='steelblue', edgecolor='white', alpha=0.8)
ax.set_xticks(range(len(summary)))
ax.set_xticklabels([str(b) for b in summary['band']], rotation=45, ha='right', fontsize=8)
ax.set_xlabel('Score Band')
ax.set_ylabel('Default Rate (%)')
ax.set_title('Default Rate by Score Band')
plt.tight_layout()
plt.show()
print(summary[['band', 'count', 'defaults', 'default_rate']].to_string(index=False))
`,

  "gini-ks": `import numpy as np
import matplotlib.pyplot as plt
from sklearn.metrics import roc_auc_score, roc_curve

np.random.seed(42)
n = 5000
score   = np.random.normal(600, 80, n).clip(300, 850)
log_odds = -0.04*(score - 500)
pd_true  = 1/(1+np.exp(-log_odds))
default  = np.random.binomial(1, pd_true)
pd_hat   = pd_true + np.random.normal(0, 0.01, n)

auc  = roc_auc_score(default, pd_hat)
gini = 2*auc - 1

sorted_idx = np.argsort(pd_hat)[::-1]
n_bad  = default.sum()
n_good = len(default) - n_bad
cum_bad  = np.cumsum(default[sorted_idx]) / n_bad
cum_good = np.cumsum(1 - default[sorted_idx]) / n_good
ks = np.max(np.abs(cum_bad - cum_good))

print(f"AUC  = {auc:.4f}")
print(f"Gini = {gini:.4f}")
print(f"KS   = {ks:.4f}")

fig, axes = plt.subplots(1, 2, figsize=(11, 4))
fpr, tpr, _ = roc_curve(default, pd_hat)
axes[0].plot(fpr, tpr, color='steelblue', label=f'Model (AUC={auc:.3f})')
axes[0].plot([0,1],[0,1],'k--', label='Random')
axes[0].fill_between(fpr, fpr, tpr, alpha=0.2, color='steelblue')
axes[0].set_title('ROC Curve')
axes[0].legend()

x_axis = np.linspace(0, 1, len(cum_bad))
axes[1].plot(x_axis, cum_bad,  color='red',    label='Cumulative Bad Rate')
axes[1].plot(x_axis, cum_good, color='green',  label='Cumulative Good Rate')
axes[1].plot(x_axis, np.abs(cum_bad - cum_good), color='orange',
             linestyle='--', label=f'KS = {ks:.3f}')
axes[1].set_title('KS Curve')
axes[1].legend()
plt.tight_layout()
plt.show()
`,

  "psi": `import numpy as np

def psi(expected, actual, n_bins=10):
    bins = np.percentile(expected, np.linspace(0, 100, n_bins+1))
    bins[0]  -= 1e-9
    bins[-1] += 1e-9
    e_counts = np.histogram(expected, bins=bins)[0] / len(expected)
    a_counts = np.histogram(actual,   bins=bins)[0] / len(actual)
    e_counts = np.clip(e_counts, 1e-9, None)
    a_counts = np.clip(a_counts, 1e-9, None)
    return np.sum((a_counts - e_counts) * np.log(a_counts / e_counts))

np.random.seed(1)
dev_scores  = np.random.normal(620, 75, 10000)
dep_stable  = np.random.normal(618, 77,  5000)
dep_shifted = np.random.normal(580, 90,  5000)

psi_stable  = psi(dev_scores, dep_stable)
psi_shifted = psi(dev_scores, dep_shifted)

print(f"PSI (stable deployment)  = {psi_stable:.4f} -> {'OK' if psi_stable < 0.1 else 'Monitor'}")
print(f"PSI (shifted population) = {psi_shifted:.4f} -> {'REBUILD' if psi_shifted > 0.25 else 'Monitor'}")
`,

  // ── ML Models ──────────────────────────────────────────────────────────────

  "xgb-credit": `import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import roc_auc_score
from sklearn.ensemble import GradientBoostingClassifier
import warnings; warnings.filterwarnings('ignore')

np.random.seed(42)
n = 8000
bureau_score   = np.random.normal(680, 80, n).clip(300, 850)
dti_ratio      = np.random.beta(2, 5, n)
employment_yrs = np.random.exponential(5, n).clip(0, 30)
prior_defaults = np.random.poisson(0.15, n).clip(0, 5)
num_enquiries  = np.random.poisson(2, n).clip(0, 10)

log_odds = (
    -4.5
    - 0.012*(bureau_score - 700)
    + 3.5*dti_ratio
    - 0.08*employment_yrs
    + 1.5*prior_defaults
    + 0.2*num_enquiries
)
pd_true = 1/(1+np.exp(-log_odds))
y = np.random.binomial(1, pd_true)

X = pd.DataFrame({
    'bureau_score':   bureau_score,
    'dti_ratio':      dti_ratio,
    'employment_yrs': employment_yrs,
    'prior_defaults': prior_defaults,
    'num_enquiries':  num_enquiries,
})
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)

scale_ratio = (y_train==0).sum() / (y_train==1).sum()
print(f"Class ratio (neg:pos) = {scale_ratio:.1f}:1  (default rate = {y_train.mean():.2%})")

model = GradientBoostingClassifier(n_estimators=100, max_depth=4, learning_rate=0.05, random_state=42)
model.fit(X_train, y_train)
pd_hat = model.predict_proba(X_test)[:, 1]
auc  = roc_auc_score(y_test, pd_hat)

print(f"\\nGradient Boosting Results:")
print(f"  AUC  = {auc:.4f}")
print(f"  Gini = {2*auc-1:.4f}")
print(f"  Default rate (test) = {y_test.mean():.2%}")
`,

  "shap-demo": `import numpy as np
import pandas as pd
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.model_selection import train_test_split
import warnings; warnings.filterwarnings('ignore')

np.random.seed(42)
n = 5000
bureau_score   = np.random.normal(680, 80, n).clip(300, 850)
dti_ratio      = np.random.beta(2, 5, n)
employment_yrs = np.random.exponential(5, n).clip(0, 30)
prior_defaults = np.random.poisson(0.15, n).clip(0, 5)
annual_income  = np.random.lognormal(11, 0.5, n)

log_odds = -4.5 - 0.012*(bureau_score-700) + 3.5*dti_ratio - 0.08*employment_yrs + 1.5*prior_defaults
pd_true  = 1/(1+np.exp(-log_odds))
y        = np.random.binomial(1, pd_true)

X = pd.DataFrame({
    'bureau_score':    bureau_score,
    'dti_ratio':       dti_ratio,
    'employment_yrs':  employment_yrs,
    'prior_defaults':  prior_defaults,
    'annual_income_k': annual_income/1000,
})
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = GradientBoostingClassifier(n_estimators=100, max_depth=3, random_state=42)
model.fit(X_train, y_train)

importances = model.feature_importances_
print("Feature Importances (MDI):")
for name, imp in sorted(zip(X.columns, importances), key=lambda x: -x[1]):
    bar = chr(9608) * int(imp * 50)
    print(f"  {name:<20} {imp:.4f}  {bar}")

sample = X_test.iloc[0:1]
pd_hat = model.predict_proba(sample)[0, 1]
print(f"\\nSample application PD = {pd_hat:.2%}")
`,

  "nn-credit": `import numpy as np
from sklearn.neural_network import MLPClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import roc_auc_score
from sklearn.preprocessing import StandardScaler
import warnings; warnings.filterwarnings('ignore')

np.random.seed(42)
n = 6000
bureau_score   = np.random.normal(680, 80, n).clip(300, 850)
dti_ratio      = np.random.beta(2, 5, n)
employment_yrs = np.random.exponential(5, n).clip(0, 30)
prior_defaults = np.random.poisson(0.15, n).clip(0, 5)

log_odds = -4.5 - 0.012*(bureau_score-700) + 3.5*dti_ratio - 0.08*employment_yrs + 1.5*prior_defaults
pd_true  = 1/(1+np.exp(-log_odds))
y        = np.random.binomial(1, pd_true)

X = np.column_stack([bureau_score, dti_ratio, employment_yrs, prior_defaults])
scaler  = StandardScaler()
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)
X_train_s = scaler.fit_transform(X_train)
X_test_s  = scaler.transform(X_test)

mlp = MLPClassifier(
    hidden_layer_sizes=(64, 32),
    activation='relu',
    max_iter=500,
    random_state=42,
    early_stopping=True,
    validation_fraction=0.15,
    n_iter_no_change=20,
)
mlp.fit(X_train_s, y_train)

pd_hat = mlp.predict_proba(X_test_s)[:, 1]
auc    = roc_auc_score(y_test, pd_hat)
print(f"Neural Network (MLP) Results")
print(f"  Architecture: {mlp.hidden_layer_sizes}")
print(f"  Iterations:   {mlp.n_iter_}")
print(f"  AUC  = {auc:.4f}")
print(f"  Gini = {2*auc-1:.4f}")
`,

  "platt": `import numpy as np
import matplotlib.pyplot as plt
from sklearn.calibration import CalibratedClassifierCV, calibration_curve
from sklearn.neural_network import MLPClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import warnings; warnings.filterwarnings('ignore')

np.random.seed(42)
n = 5000
X_raw = np.random.randn(n, 4)
log_odds = -2 + X_raw @ np.array([-1.2, 0.8, 0.5, -0.3])
pd_true  = 1/(1+np.exp(-log_odds))
y = np.random.binomial(1, pd_true)

X_tr, X_te, y_tr, y_te = train_test_split(X_raw, y, test_size=0.3, random_state=0)
scaler  = StandardScaler()
X_tr_s  = scaler.fit_transform(X_tr)
X_te_s  = scaler.transform(X_te)

mlp = MLPClassifier(hidden_layer_sizes=(32,16), max_iter=300, random_state=0)
mlp.fit(X_tr_s, y_tr)

mlp_cal = CalibratedClassifierCV(mlp, method='sigmoid', cv='prefit')
mlp_cal.fit(X_te_s[:200], y_te[:200])

p_raw = mlp.predict_proba(X_te_s)[:, 1]
p_cal = mlp_cal.predict_proba(X_te_s)[:, 1]

fig, ax = plt.subplots(figsize=(7, 5))
ax.plot([0,1],[0,1],'k--', label='Perfect')
for p, label in [(p_raw, 'Raw MLP'), (p_cal, 'Platt-scaled')]:
    frac, mean_p = calibration_curve(y_te, p, n_bins=8)
    ax.plot(mean_p, frac, 'o-', label=label)
ax.set_xlabel('Mean Predicted PD')
ax.set_ylabel('Actual Default Rate')
ax.set_title('Calibration: Raw MLP vs Platt Scaling')
ax.legend()
plt.tight_layout()
plt.show()
`,

  "model-compare": `import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import GradientBoostingClassifier, RandomForestClassifier
from sklearn.neural_network import MLPClassifier
from sklearn.model_selection import StratifiedKFold
from sklearn.metrics import roc_auc_score
from sklearn.preprocessing import StandardScaler
import warnings; warnings.filterwarnings('ignore')

np.random.seed(42)
n = 10_000
bureau_score   = np.random.normal(680, 80, n).clip(300, 850)
dti_ratio      = np.random.beta(2, 5, n)
employment_yrs = np.random.exponential(5, n).clip(0, 30)
prior_defaults = np.random.poisson(0.15, n).clip(0, 5)
loan_to_value  = np.random.beta(3, 2, n)

log_odds = (
    -4.5
    - 0.012*(bureau_score-700)
    + 4.0*dti_ratio
    - 0.05*employment_yrs
    + 1.8*prior_defaults
    + 2.0*(dti_ratio * loan_to_value)
    - 0.8*(bureau_score > 740).astype(float)
)
pd_true = 1/(1+np.exp(-log_odds))
y = np.random.binomial(1, pd_true)

X = np.column_stack([bureau_score, dti_ratio, employment_yrs, prior_defaults, loan_to_value])
scaler = StandardScaler()
X_s    = scaler.fit_transform(X)

models = {
    'Logistic Regression': LogisticRegression(max_iter=500),
    'Random Forest':       RandomForestClassifier(n_estimators=100, max_depth=5, random_state=42),
    'Gradient Boosting':   GradientBoostingClassifier(n_estimators=100, max_depth=4,
                                                       learning_rate=0.05, random_state=42),
    'Neural Network':      MLPClassifier(hidden_layer_sizes=(64,32), max_iter=300, random_state=42),
}

cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
print(f"{'Model':<25} {'AUC':>8} {'+-':>6} {'Gini':>8}")
print("-" * 52)
for name, model in models.items():
    X_use = X_s if 'Neural' in name else X
    aucs  = []
    for tr_idx, te_idx in cv.split(X_use, y):
        model.fit(X_use[tr_idx], y[tr_idx])
        auc = roc_auc_score(y[te_idx], model.predict_proba(X_use[te_idx])[:,1])
        aucs.append(auc)
    mu = np.mean(aucs)
    sd = np.std(aucs)
    print(f"{name:<25} {mu:.4f} {sd:.4f} {2*mu-1:.4f}")
`,

  // ── Regulation ─────────────────────────────────────────────────────────────

  "irb-capital": `import numpy as np
from scipy.stats import norm

def irb_capital(pd, lgd, ead, r, maturity=2.5):
    cond_pd = norm.cdf(
        (norm.ppf(pd) + np.sqrt(r/(1-r)) * norm.ppf(0.999)) / np.sqrt(1/(1-r))
    )
    K    = lgd * cond_pd - lgd * pd
    b    = (0.11852 - 0.05478 * np.log(pd)) ** 2
    ma   = (1 + (maturity - 2.5) * b) / (1 - 1.5 * b)
    K_adj = K * ma
    rw    = K_adj * 12.5
    return K_adj, rw, K_adj * ead

exposures = [
    ("AAA Corporate",    0.001, 0.45, 1_000_000, 0.12),
    ("BBB Corporate",    0.010, 0.45, 1_000_000, 0.12),
    ("BB  Corporate",    0.050, 0.45, 1_000_000, 0.12),
    ("B   Corporate",    0.150, 0.45, 1_000_000, 0.12),
    ("Retail Mortgage",  0.020, 0.10, 1_000_000, 0.15),
    ("Retail Unsecured", 0.060, 0.75, 1_000_000, 0.04),
]

print(f"{'Exposure':<22} {'PD':>6} {'LGD':>6} {'RW%':>8} {'Capital':>12}")
print("-" * 60)
total = 0
for name, pd, lgd, ead, r in exposures:
    k, rw, cap = irb_capital(pd, lgd, ead, r)
    total += cap
    print(f"{name:<22} {pd:>5.1%} {lgd:>5.0%} {rw*100:>7.1f}%%  \${cap:>10,.0f}")
print(f"{'TOTAL CAPITAL':>48}  \${total:>10,.0f}")
`,

  "moc": `import numpy as np

def moc_pd(pd_estimate, years_data, data_quality='good'):
    n_approx = 1000
    se       = np.sqrt(pd_estimate * (1 - pd_estimate) / (years_data * n_approx))
    stat_moc = 1.645 * se
    dq_add   = {'good': 0.001, 'acceptable': 0.003, 'poor': 0.010}[data_quality]
    total_moc = stat_moc + dq_add
    return {
        'pd_estimate':    pd_estimate,
        'statistical_moc': stat_moc,
        'data_quality_moc': dq_add,
        'total_moc':      total_moc,
        'regulatory_pd':  min(pd_estimate + total_moc, 1.0),
        'moc_pct_of_pd':  total_moc / pd_estimate * 100,
    }

for years in [5, 7, 10, 15]:
    res = moc_pd(0.02, years, 'good')
    print(
        f"{years}yr data: PD_reg = {res['regulatory_pd']:.3%}"
        f"  (MoC = +{res['total_moc']*100:.2f}bp  = {res['moc_pct_of_pd']:.0f}%% of PD)"
    )
`,

  "ecl-calc": `import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

def calc_lifetime_ecl(pd_annual, lgd, ead_t0, tenor_yrs, discount_rate=0.05, repayment_rate=0.1):
    rows     = []
    ead      = ead_t0
    survival = 1.0
    for t in range(1, tenor_yrs + 1):
        marginal_pd = pd_annual * survival
        discount    = 1 / (1 + discount_rate) ** t
        ecl_t       = marginal_pd * lgd * ead * discount
        rows.append({'year': t, 'ead': ead, 'marginal_pd': marginal_pd, 'ecl_t': ecl_t})
        survival *= (1 - pd_annual)
        ead      *= (1 - repayment_rate)
    return pd.DataFrame(rows)

pd_good  = 0.008
pd_sicr  = 0.024
lgd      = 0.20
ead_0    = 250_000

ecl_12m  = calc_lifetime_ecl(pd_good, lgd, ead_0, 1)['ecl_t'].sum()
ecl_life = calc_lifetime_ecl(pd_good, lgd, ead_0, 25)['ecl_t'].sum()
ecl_sicr = calc_lifetime_ecl(pd_sicr, lgd, ead_0, 25)['ecl_t'].sum()

print(f"Mortgage: EAD=\${ead_0:,.0f}, LGD={lgd:.0%}")
print()
print(f"Stage 1 (12-month ECL)  : \${ecl_12m:>10,.0f}  ({ecl_12m/ead_0:.3%} of EAD)")
print(f"Stage 1 (lifetime ECL)  : \${ecl_life:>10,.0f}  ({ecl_life/ead_0:.3%} of EAD)")
print(f"Stage 2 (lifetime ECL)  : \${ecl_sicr:>10,.0f}  ({ecl_sicr/ead_0:.3%} of EAD)")
cliff = ecl_sicr - ecl_12m
print(f"\\nStage 1->2 cliff : \${cliff:>10,.0f}  ({ecl_sicr/ecl_12m-1:.0%} increase)")

df  = calc_lifetime_ecl(pd_sicr, lgd, ead_0, 25)
fig, ax = plt.subplots(figsize=(9, 4))
ax.bar(df['year'], df['ecl_t']/1000, color='steelblue', alpha=0.8)
ax.set_xlabel('Year')
ax.set_ylabel('ECL Contribution ($000s)')
ax.set_title(f'Lifetime ECL by Year  (Stage 2, PD={pd_sicr:.1%})')
plt.tight_layout()
plt.show()
`,

  "backtest": `import numpy as np
import pandas as pd
from scipy.stats import binom
import matplotlib.pyplot as plt

np.random.seed(42)
results = []
for yr in range(2021, 2024):
    predicted_pd = np.random.beta(2, 30, 5000)
    true_pd      = predicted_pd * (1.0 if yr < 2022 else 1.3)
    actual_default = np.random.binomial(1, true_pd.clip(0, 1))
    results.append(pd.DataFrame({'year': yr, 'predicted_pd': predicted_pd,
                                 'actual_default': actual_default}))

df = pd.concat(results, ignore_index=True)
df['pd_band'] = pd.qcut(df['predicted_pd'], q=10, labels=False)
bt = df.groupby(['year', 'pd_band']).agg(
    predicted=('predicted_pd', 'mean'),
    actual=('actual_default', 'mean'),
    n=('actual_default', 'count')
).reset_index()

print("Back-Test: Predicted vs Actual Default Rate")
print("=" * 55)
for yr in [2021, 2022, 2023]:
    sub   = bt[bt['year'] == yr]
    ratio = sub['actual'].sum() / sub['predicted'].sum()
    mape  = np.mean(np.abs(sub['actual'] - sub['predicted']) / sub['predicted'].clip(1e-6))
    print(f"  {yr}: Pred/Act ratio = {ratio:.3f}  MAPE = {mape:.1%}")

yr_data = df[df['year'] == 2023]
exp_def = yr_data['predicted_pd'].sum()
act_def = yr_data['actual_default'].sum()
p_val   = binom.sf(int(act_def)-1, len(yr_data), yr_data['predicted_pd'].mean())
print(f"\\n2023 Traffic Light Test:")
print(f"  Expected defaults : {exp_def:.0f}")
print(f"  Actual defaults   : {act_def}")
print(f"  p-value           : {p_val:.4f}  ({'AMBER' if p_val < 0.05 else 'GREEN'})")
`,

  "monitoring": `import numpy as np
import matplotlib.pyplot as plt

np.random.seed(0)
months   = np.arange(1, 25)
dev_gini = 0.52
gini_series = (
    dev_gini
    - 0.008 * (months / 12)
    + np.random.normal(0, 0.015, len(months))
)
psi_series = 0.04 + 0.003 * months + np.random.exponential(0.02, len(months))

fig, axes = plt.subplots(1, 2, figsize=(12, 4))

axes[0].plot(months, gini_series * 100, 'b-o', markersize=4, label='Monthly Gini')
axes[0].axhline(dev_gini * 100,        color='green',  linestyle='--', label=f'Dev Gini = {dev_gini:.2f}')
axes[0].axhline((dev_gini-0.05)*100,   color='orange', linestyle=':',  label='Alert (-5pp)')
axes[0].axhline((dev_gini-0.10)*100,   color='red',    linestyle=':',  label='Critical (-10pp)')
axes[0].set_xlabel('Month in Production')
axes[0].set_ylabel('Gini (%)')
axes[0].set_title('Gini Monitoring Dashboard')
axes[0].legend(fontsize=8)

colors = ['green' if p < 0.1 else 'orange' if p < 0.25 else 'red' for p in psi_series]
axes[1].bar(months, psi_series, color=colors)
axes[1].axhline(0.10, color='orange', linestyle='--', label='Monitor (0.10)')
axes[1].axhline(0.25, color='red',    linestyle='--', label='Rebuild  (0.25)')
axes[1].set_xlabel('Month in Production')
axes[1].set_ylabel('PSI')
axes[1].set_title('Population Stability Index')
axes[1].legend()

plt.tight_layout()
plt.show()
`,
};
