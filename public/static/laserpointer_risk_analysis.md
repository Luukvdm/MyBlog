## 1. About

In this document I describe the risk of possible threats. 
And describe what parts of the data in and around the system should be treated.

## 2. CIAP

I’m going to create a matrix for each type of data. 
In these matrices I’m going to be assigning a value as described in the table below.

| **Confidentiality** | **Integrity** | **Availability** | **Privacy**      |
| ------------------- | ------------- | ---------------- | ---------------- |
| Public              | Unimportant   | Not Necessary    | Public           |
| Internal use        | Protected     | Important        | Personal         |
| Confidential        | High          | Required         | Special personal |
| Classified          | Guaranteed    | Essential        |                  |
 
### 2.1 New Job

When a user creates a new job, he first creates it in the GUI, then sends it to the server.
The server then needs to store the job until the system is ready to start it. 
So the data has two states in the system, in transport and stored.

| **State**    | **Confidentiality** | **Integrity** | **Availability** | **Privacy** |
| ------------ | ------------------- | ------------- | ---------------- | ----------- |
| In transport | Confidential        | Guaranteed    | Not necessary    | Personal    |
| Stored       | Internal use        | High          | Important        | Personal    |

### 2.2 Start A Job

When a job is started it starts in storage and needs to be transfered to the system that executes the job. 
Afterwards the job needs to be transfered back to the system and be stored again.

| **State**    | **Confidentiality** | **Integrity** | **Availability** | **Privacy** |
| ------------ | ------------------- | ------------- | ---------------- | ----------- |
| In transport | Confidential        | Guaranteed    | Not necessary    | Personal    |
| Stored       | Confidential        | Protected     | Not necessary    | Personal    |

### 2.3 Accounts

If a user wants to use the system, he needs an account. Accounts need to be stored, 
editable and certain data needs to be transported at times.

| **State**    | **Confidentiality** | **Integrity** | **Availability** | **Privacy** |
| ------------ | ------------------- | ------------- | ---------------- | ----------- |
| Transport    | Classified          | Guaranteed    | Required         | Personal    |
| Editing      | Classified          | Guaranteed    | Required         | Personal    |
| Stored       | Confidential        | High          | Required         | Personal    |

### 2.4 Word Lists

Users can create/ upload word lists to use in the jobs.

| **State**    | **Confidentiality** | **Integrity** | **Availability** | **Privacy** |
| ------------ | ------------------- | ------------- | ---------------- | ----------- |
| Transport    | Unimportant         | Protected     | Not necessary    | Public      |
| Editing      | Unimportant         | Protected     | Not necessary    | Public      |
| Stored       | Unimportant         | Protected     | Not necessary    | Public      |

## 3. Threats

To figure out what the biggest threat is, we can look at the impact and the risk.

| **Threat**         | **Impact description**                            | **Impact[^1]** | **Risk[^2]** |
| ------------------ | ------------------------------------------------- | ---------- | -------- |
| Data breach        | Abuse of sensitive data, reputation damage, fines | High       | Medium   |
| DDoS               | Downtime, financial damage                        | Medium     | Low      |
| State actors       | Human safety, reputation damage, physical damage  | High       | Low      |
| Malware infection  | Loss of data, downtime, financial damage          | Medium     | Low      |

[^1]: Possible values: Low - Medium - High
[^2]: Possible values: Low - Medium - High

Using the formula Risk * Impact we can determine what security measures to prioritize.

**Ranked threats**
1. Data breach
2. State actors
3. DDos
4. Malware infection


